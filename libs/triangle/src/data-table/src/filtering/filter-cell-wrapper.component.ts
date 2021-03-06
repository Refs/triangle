import { Component, Input, ContentChild, HostBinding, AfterContentInit, OnDestroy } from '@angular/core';
import { FilterService } from './filter.service';
import { BaseFilterCellComponent } from './base-filter-cell.component';
import { isBlank, isPresent, isNullOrEmptyString } from '../utils';
import { FilterInputDirective } from './filter-input.directive';
import { CompositeFilterDescriptor, FilterDescriptor } from '@gradii/triangle/data-query';
import { ColumnComponent } from '../column.component';
@Component({
  selector : 'tri-data-table-filter-wrapper-cell',
  template: `
              <ng-content></ng-content>
              <tri-data-table-filter-cell-operators
                [showOperators]="showOperators"
                [operators]="operators"
                (clear)="onClear()"
                [showButton]="showButton"
                [(value)]="currentOperator">
              </tri-data-table-filter-cell-operators>
            `
})
export class FilterCellWrapperComponent extends BaseFilterCellComponent implements AfterContentInit, OnDestroy {
  @Input() showOperators: boolean;
  @Input()
  operators: Array<{
    text: string;
    value: string;
  }>;
  @Input() column: ColumnComponent;
  @Input() filter: CompositeFilterDescriptor;
  @ContentChild(FilterInputDirective) input: FilterInputDirective;
  private _defaultOperator;
  private _operator;
  private changeSubscription;
  constructor(filterService: FilterService) {
    super(filterService);
    this.showOperators = true;
    this.operators = [];
  }
  @HostBinding('class.ant-filtercell-wrapper')
  get hostClasses() {
    return true;
  }
  @HostBinding('class.ant-filtercell')
  get overrideBaseClasses() {
    return false;
  }
  get currentFilter(): FilterDescriptor {
    return this.filterByField(this.column.field);
  }
  get showButton() {
    const filter = this.currentFilter;
    return isPresent(filter) && !isBlank(filter.value);
  }
  @Input()
  get currentOperator() {
    const filter = this.currentFilter;
    if (!this._operator) {
      this._operator = filter ? filter.operator : this.defaultOperator;
    }
    return this._operator;
  }
  set currentOperator(value) {
    this._operator = value;
    if (value === 'isnull' || value === 'isnotnull' || value === 'isempty' || value === 'isnotempty') {
      this.applyNoValueFilter(value);
    } else if (!isBlank(value) && isPresent(this.currentFilter)) {
      this.onChange(this.currentFilter.value);
    }
  }
  @Input()
  get defaultOperator() {
    if (!isNullOrEmptyString(this._defaultOperator)) {
      return this._defaultOperator;
    } else if (this.operators && this.operators.length) {
      return this.operators[0].value;
    }
    return 'eq';
  }
  set defaultOperator(value) {
    this._defaultOperator = value;
  }
  ngAfterContentInit() {
    if (isPresent(this.input)) {
      this.changeSubscription = this.input.change.subscribe(this.onChange.bind(this));
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }
  }
  onChange(value) {
    this.applyFilter(
      isBlank(value)
        ? this.removeFilter(this.column.field)
        : this.updateFilter({
            field: this.column.field,
            operator: this.currentOperator,
            value
          })
    );
  }
  onClear() {
    this.onChange(null);
  }
  protected applyNoValueFilter(operator: string): void {
    this.applyFilter(
      this.updateFilter({
        field: this.column.field,
        operator,
        value: null
      })
    );
  }
}

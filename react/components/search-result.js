import React from 'react'
import Immutable from 'immutable'

import ButtonDropdown from './button-dropdown'
import Pagination from './pagination'


class SearchResult extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            perPage: props.defaultPrePage,
            curPage: 1,
            sorting: props.defaultSorting,
            filters: {
                attrs: props.cols.filter(col => col.filtering).map(col => [col.attr, col.filterMask])
            }
        }
        this.init()
    }

    componentWillUpdate = () => {
        this.init()
    }

    init() {
        this.checkboxes = []
        this.radios = []
    }

    processData() {
        const { cols } = this.props
        let data = Immutable.fromJS(this.props.data)

        cols.map(col => {
            if (col.filterMask) {
                data = data.map(entry => entry.set(`${col.attr}FilterVal`, (entry.get(col.attr))))
            }
            if (col.content) {
                data = data.map(entry => entry.set(col.attr, col.content(entry.toJSON())))
            }
        })

        return data.toJSON()
    }

    filterData(data) {
        const { filters } = this.state
        const hasFilterValue = entry => {
            let isSub = true
            filters.attrs.map(attr => {
                const filterVal = filters[attr[0]]
                const entryVal = attr[1] ? entry[`${attr[0]}FilterVal`] : entry[attr[0]]

                if (filterVal && filterVal !== '' && (String(entryVal).toLowerCase().indexOf(filterVal.toLowerCase()) === -1)) {
                    isSub = false
                }
            })
            return isSub
        }

        return filters ? data.filter(hasFilterValue) : data
    }

    dataToDisplay(filteredData = []) {
        let data = Immutable.fromJS(filteredData)

        // Sorting
        if (this.state.sorting.attr && this.state.sorting.type) {
            data = data.sortBy(d => {
                let attrValue = d.get(this.state.sorting.attr)
                if (attrValue === undefined) {
                    return ''
                } else if (typeof attrValue === 'string') {
                    // return lower case for sorting purpose.
                    return attrValue.toLowerCase()
                } else {
                    return attrValue
                }
            })
            if (this.state.sorting.type === 'desc') {
                data = data.reverse()
            }
        }


        // Paging
        let from = (this.state.curPage - 1) * this.state.perPage
        let to = from + this.state.perPage
        data = data.slice(from, to)

        return data.toJSON()
    }

    changeCurPage = (curPage) => {
        this.setState({
            curPage
        })
    }

    changePerPage = (perPage) => {
        this.setState({
            perPage,
            curPage: 1
        })
    }

    changeSorting = (attr, type) => {
        return (e) => {
            e.preventDefault()
            this.setState({
                sorting: {
                    attr,
                    type
                }
            })
        }
    }

    toggleMainCheckbox = (e) => {
        this.checkboxes.map(
            cb => {
                cb.checked = e.target.checked
            }
        )
    }

    headers = () => {
        let cols = this.props.cols.map(
            (col, i) => (
                <th key={i}>
                    {col.label}
                    {
                        (col.sorting) ?
                            <span>
                                <a href="#"
                                        className="sort_up"
                                        onClick={this.changeSorting(col.attr, 'asc')}
                                >
                                    <span className={"i_up" + ((this.state.sorting.attr === col.attr && this.state.sorting.type === 'asc')? ' active' : '')}></span>
                                </a>
                                <a href="#"
                                        className="sort_down"
                                        onClick={this.changeSorting(col.attr, 'desc')}
                                >
                                    <span className={"i_down" + ((this.state.sorting.attr === col.attr && this.state.sorting.type === 'desc')? ' active' : '')}></span>
                                </a>
                            </span>
                        :
                            null
                    }
                </th>
            )
        )

        if (this.props.checkboxCol) {
            cols.unshift(
                <th key="checkboxCol">
                    <input type="checkbox"
                            onChange={this.toggleMainCheckbox}
                    />
                </th>
            )
        }

        if (this.props.radioCol) {
            cols.unshift(
                <th key="radioCol">
                </th>
            )
        }

        return cols
    }

    row = (obj) => {
        let row = this.props.cols.map(
            (col, i) => (
                <td key={i}>
                    {obj[col.attr]}
                </td>
            )
        )

        // Checkbox
        if (this.props.checkboxCol) {
            row.unshift(
                <td key="checkboxCol">
                    <input type="checkbox"
                            ref={checkbox => {
                                if (checkbox) this.checkboxes.push(checkbox)
                            }}
                            name={this.props.checkboxCol.name}
                            value={obj[this.props.checkboxCol.valueAttr]}
                    />
                </td>
            )
        }

        // Radio
        if (this.props.radioCol) {
            row.unshift(
                <td key="radioCol">
                    <input type="radio"
                            ref={radio => {
                                if (radio) this.radios.push(radio)
                            }}
                            name={this.props.radioCol.name}
                            value={obj[this.props.radioCol.valueAttr]}
                    />
                </td>
            )
        }

        return row
    }

    rows = (colNum, data, loading) => {
        if (loading) {
            return (
                <tr>
                    <td className="text-center" colSpan={colNum}>
                        Loading &hellip;
                    </td>
                </tr>
            )
        }

        if (data.length > 0) {
            return data.map(
                (obj, i) => (
                    <tr key={i}>
                        {this.row(obj)}
                    </tr>
                )
            )
        }

        return (
            <tr>
                <td className="text-center" colSpan={colNum}>
                    No results found.
                </td>
            </tr>
        )
    }

    buttonAction = (actionButton) => {
        return (e) => {
            e.preventDefault()

            let checked
            switch (actionButton.dataToUse) {
                case 'radio':
                    let checkedRadio = this.radios.find(ro => ro.checked)
                    checked = checkedRadio ? checkedRadio.value : undefined
                    break;
                case 'checkbox':
                default:
                    let checkedCheckboxes = this.checkboxes.filter(cb => cb.checked)
                    checked = checkedCheckboxes.map(cb => cb.value)
            }
            actionButton.onClick(checked)
        }
    }

    actionButtons = () => {
        // Wrap onClick func for each button
        return this.props.actionButtons.map(
            b => (
                {
                    ...b,
                    onClick: this.buttonAction(b)
                }
            )
        )
    }

    changeFilter(attr) {
        return (e) => {
            this.setState({
                filters: {
                    ...this.state.filters,
                    [attr]: e.target.value
                }
            })
        }
    }

    renderFilter() {
        const { checkboxCol, radioCol, cols } = this.props
        const hasFiltering = cols.some(col => col.filtering)
        if (!hasFiltering) { return }
        let renderedCols = cols.map(
            (col, i) => (
                <td key={`col-filter-${i}`}>
                    {col.filtering ? <input type='text' placeholder={`Filter by ${col.label}`} onChange={this.changeFilter(col.attr)}/> : undefined}
                </td>
            )
        )

        if (checkboxCol) {
            renderedCols.unshift(
                <td key="col-filter-checkboxCol">

                </td>
            )
        }

        if (radioCol) {
            renderedCols.unshift(
                <td key="col-filter-radioCol">
                </td>
            )
        }

        return <tr>{renderedCols}</tr>
    }

    render = () => {
        const buttons = this.actionButtons()
        const headers = this.headers()
        const data = this.filterData(this.processData())
        const displayData = this.dataToDisplay(data)
        const rows = this.rows(headers.length, displayData, this.props.loading)

        return (
            <div>
                <div className="">
                    <ButtonDropdown
                            buttons={buttons}
                    />
                </div>

                <table className="stacktable">
                    <thead>
                        <tr>
                            {headers}
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderFilter()}
                        {rows}
                    </tbody>
                </table>

                <Pagination
                    curPage={this.state.curPage}
                    perPage={this.state.perPage}
                    maxPage={Math.ceil(data.length / this.state.perPage)}
                    onChangeCurPage={this.changeCurPage}
                    onChangePerPage={this.changePerPage}
                    onChangeSorting={this.changeSorting}
                />
            </div>
        )
    }
}

SearchResult.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    cols: React.PropTypes.arrayOf(React.PropTypes.shape({
        label: React.PropTypes.string.isRequired,
        attr: React.PropTypes.string.isRequired,
        sorting: React.PropTypes.bool,
        content: React.PropTypes.func,
        filtering: React.PropTypes.bool
    })),
    loading: React.PropTypes.bool,
    defaultPrePage: React.PropTypes.number,
    defaultSorting: React.PropTypes.shape({
        attr: React.PropTypes.string,
        type:  React.PropTypes.oneOf(['asc', 'desc'])
    }),
    checkboxCol: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        valueAttr:  React.PropTypes.string,
    }),
    radioCol: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        valueAttr:  React.PropTypes.string,
    }),
    actionButtons: React.PropTypes.arrayOf(React.PropTypes.shape({
        label: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
        dataToUse: React.PropTypes.oneOf(['radio', 'checkbox'])
    })),
}

SearchResult.defaultProps = {
    data: [],
    cols: [],
    defaultPrePage: 10,
    defaultSorting: {},
    actionButtons: [],
    loading: false
}

export default SearchResult

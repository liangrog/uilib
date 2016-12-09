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
            sorting: props.defaultSorting
        }
        this.checkboxes = []
        this.radios = []
    }

    componentWillUpdate = () => {
        this.checkboxes = []
        this.radios = []
    }

    dataToDisplay = () => {
        let data = Immutable.fromJS(this.props.data)

        // Sorting
        if (this.state.sorting.attr && this.state.sorting.type) {
            data = data.sortBy(d => d.get('name'))
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

    changeSorting = (attr, type, e) => {
        e.preventDefault()
        this.setState({
            sorting: {
                attr,
                type
            }
        })
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
                                        onClick={this.changeSorting.bind(null, col.attr, 'asc')}
                                >
                                    <span className={"i_up" + ((this.state.sorting.attr === col.attr && this.state.sorting.type === 'asc')? ' active' : '')}></span>
                                </a>
                                <a href="#"
                                        className="sort_down"
                                        onClick={this.changeSorting.bind(null, col.attr, 'desc')}
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

    col = (obj, col) => {
        if (col.content) {
            return col.content(obj)
        } else {
            return obj[col.attr]
        }
    }

    row = (obj) => {
        let row = this.props.cols.map(
            (col, i) => (
                <td key={i}>
                    {this.col(obj, col)}
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

    rows = (colNum) => {
        let results = this.dataToDisplay()
        if (results.length > 0) {
            return results.map(
                (obj, i) => (
                    <tr key={i}>
                        {this.row(obj)}
                    </tr>
                )
            )
        } else {
            return (
                <tr>
                    <td className="text-center" colSpan={colNum}>
                        No results found.
                    </td>
                </tr>
            )
        }
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

    render = () => {
        let buttons = this.actionButtons()
        let headers = this.headers()
        let rows = this.rows(headers.length)

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
                        {rows}
                    </tbody>
                </table>

                <Pagination
                        curPage={this.state.curPage}
                        perPage={this.state.perPage}
                        maxPage={Math.ceil(this.props.data.length / this.state.perPage)}
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
        content: React.PropTypes.func
    })),
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
    actionButtons: []
}

export default SearchResult

import React from 'react'
import Immutable from 'immutable'

const SearchResult = ({ cols, data, loading }) => {

    const renderOrderByButton = ({ orderAsc, orderDesc }) => (orderAsc || orderDesc) ?
        <span>
            {
                orderAsc ?
                    <a href="#"
                        className="sort_up"
                        onClick={orderAsc.onChangeOrder} >
                        <span className={`i_up ${orderAsc.active ? 'active' : ''}`}></span>
                    </a> : undefined
            }
            {
                orderDesc ?
                    <a href="#"
                        className="sort_down"
                        onClick={orderDesc.onChangeOrder} >
                        <span className={`i_down ${orderDesc.active ? 'active' : ''}`}></span>
                    </a> : undefined
            }
        </span>
        : undefined

    const headers = () =>
        cols.map(
            (col, i) => (
                <th key={i}>
                    {col.label}
                    {renderOrderByButton(col)}
                </th>
            )
        )

    const row = obj =>
        cols.map(
            (col, i) => (
                <td key={i}>
                    {obj[col.attr]}
                </td>
            )
        )

    const rows = ({ colNum, data, loading }) => {
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
                        {row(obj)}
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

    const processData = ({ cols, data = [] }) => {
        let returnData = Immutable.fromJS(data)

        cols.map(col =>
            col.content ? (returnData = returnData.map(entry => entry.set(col.attr, col.content(entry.toJSON())))) : undefined
        )

        return returnData.toJSON()
    }

    const headersVal = headers()

    return (
        <table className="stacktable">
            <thead>
                <tr>{headersVal}</tr>
            </thead>

            <tbody>
                {rows({ data: processData({ data, cols }), loading, colNum: headersVal.length })}
            </tbody>
        </table>
    )
}

export default SearchResult

import React from 'react'
import Immutable from 'immutable'

import formSectionCollapsableDecor from './form-section-collapsable-decor'


const formSectionAddDecor = (Component) => {

    const DisplayComponent = formSectionCollapsableDecor(Component)

    let expandedIndex = -1

    return (props) => {

        // Default the expanded one to the last one
        if (expandedIndex === -1) {
            expandedIndex = props.dataList.length - 1
        }

        let onAddMore = () => {
            let dataList = Immutable.fromJS(props.dataList)
            dataList = dataList.push({})
            expandedIndex = dataList.count() - 1
            props.onUserInput(dataList.toJSON())
        }

        let onEdit = (index, data) => {
            let dataList = Immutable.fromJS(props.dataList)
            dataList = dataList.set(index, data)
            props.onUserInput(dataList.toJSON())
        }

        let onDelete = (index, e) => {
            e.preventDefault()
            let dataList = Immutable.fromJS(props.dataList)
            dataList = dataList.delete(index)
            if (index < expandedIndex) {
                expandedIndex--
            }
            props.onUserInput(dataList.toJSON())
        }

        let onExpand = (index, e) => {
            e.preventDefault()
            expandedIndex = index
            props.onUserInput(props.dataList)
        }

        return (
            <div>
                {
                    props.dataList.map(
                        (data, i) => (
                            <DisplayComponent key={i}
                                    formData={data}
                                    onUserInput={onEdit.bind(null, i)}
                                    onExpand={onExpand.bind(null, i)}
                                    onDelete={onDelete.bind(null, i)}
                                    collapsedDisplayAttrs={props.collapsedDisplayAttrs}
                                    collapsed={i !== expandedIndex}
                                    />
                        )
                    )
                }

                <div className="clearfix"></div>
                <hr className="hr1" />

                <button type="button" className="btn btn_secondary btn_small" onClick={onAddMore}>
                    Add Another Child
                </button>
            </div>
        )
    }
}

export default formSectionAddDecor

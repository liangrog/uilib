import React from 'react'
import Immutable from 'immutable'

import formSectionCollapsableDecor from './form-section-collapsable-decor'
import uiHelper from '../../utils/ui-helper'


const formSectionAddDecorNew = (Component) => {

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
            props.onChange({
                target: {
                    name: props.namePrefix,
                    value: dataList.toJSON()
                }
            })
        }

        let onDelete = (index, e) => {
            e.preventDefault()
            let dataList = Immutable.fromJS(props.dataList)
            dataList = dataList.delete(index)
            if (index < expandedIndex) {
                expandedIndex--
            }
            props.onChange({
                target: {
                    name: props.namePrefix,
                    value: dataList.toJSON()
                }
            })
        }

        let onExpand = (index, e) => {
            e.preventDefault()
            expandedIndex = index
            props.onChange({
                target: {
                    name: props.namePrefix,
                    value: props.dataList
                }
            })
        }

        return (
            <div>
                {
                    props.dataList.map(
                        (data, i) => (
                            <DisplayComponent key={i}
                                    namePrefix={uiHelper.makeName(props.namePrefix, i)}
                                    formData={data}
                                    onChange={props.onChange}
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

export default formSectionAddDecorNew

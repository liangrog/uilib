import React from 'react'
import Immutable from 'immutable'
import Collapse, { Panel } from 'rc-collapse'

import uiHelper from '../../utils/ui-helper'

const formSectionAddDecor = (Component) => {

    return class NewComponent extends React.Component {

        constructor(props) {
            super(props)
            this.state = {
                activeKey: ""
            }
        }

        onAddMore = () => {
            let dataList = Immutable.fromJS(this.props.dataList)
            dataList = dataList.push({})
            this.props.onChange({
                target: {
                    name: this.props.namePrefix,
                    value: dataList.toJSON()
                }
            })
            this.setState({
                activeKey: "" + (dataList.count() - 1)
            })
        }

        onDelete = (data, index) => {
            return (e) => {
                e.preventDefault()
                if (this.props.onDelete) {
                    this.props.onDelete(data, index)
                } else {
                    const dataList = Immutable.fromJS(this.props.dataList).delete(index)
                    this.props.onChange({
                        target: {
                            name: this.props.namePrefix,
                            value: dataList.toJSON()
                        }
                    })
                }
            }
        }

        onReorder = (index, change) => {
            return (e) => {
                e.preventDefault()
                const newPos = index + change
                if (newPos >= 0 && newPos < this.props.dataList.length) {
                    let dataList = Immutable.fromJS(this.props.dataList)
                    let dataItem = dataList.get(index)
                    dataList = dataList.delete(index)
                    dataList = dataList.insert(newPos, dataItem)
                    this.props.onChange({
                        target: {
                            name: this.props.namePrefix,
                            value: dataList.toJSON()
                        }
                    })
                }
            }
        }

        onPanelClick = (activeKey) => {
            this.setState({
                activeKey
            })
        }

        onCollapseAll = (e) => {
            e.preventDefault()
            this.setState({
                activeKey: ""
            })
        }

        panelHeader = (data, index) => {
            let header = []

            if (this.props.displayIndex) {
                header.push(
                    <span key="panelHeader_index">
                        {index + 1}. &nbsp;
                    </span>
                )
            }

            if (Immutable.fromJS(data).isEmpty()) {
                header.push(
                    <span key="panelHeader_new">
                        --- New ---
                    </span>
                )
            } else {
                header = header.concat(this.props.collapsedDisplayAttrs.map(
                    (attr, i) => (
                        <span key={"panelHeader_" + i}>
                            {data[attr]} &nbsp;
                        </span>
                    )
                ))
            }

            return header
        }

        getPanelHeaderActions = (data, i) => {
            let reorderingActions = []
            if (this.props.reordering) {
                // if (i > 0) {
                    reorderingActions.push(
                        <a key="reorder_up" className="link" href="#" onClick={this.onReorder(i, -1)} style={{margin: '0 5px'}}>
                            Up
                        </a>
                    )
                // }
                // if (i < this.props.dataList.length - 1) {
                    reorderingActions.push(
                        <a key="reorder_down" className="link" href="#" onClick={this.onReorder(i, +1)} style={{margin: '0 5px'}}>
                            Down
                        </a>
                    )
                // }
            }

            return (
                <div key={"panel_actions_" + i} style={{position: 'relative'}}>
                    <div style={{position: 'absolute', right: 10, top: 10}}>
                        {reorderingActions}
                        <a key="delete" className="link" href="#" onClick={this.onDelete(data, i)} style={{margin: '0 5px'}}>
                            Delete
                        </a>
                    </div>
                </div>
            )
        }

        getPanels = () => {
            return this.props.dataList.map(
                (data, i) => [
                    this.getPanelHeaderActions(data, i)
                    ,
                    <Panel key={"panel_" + i} header={this.panelHeader(data, i)}>
                        <Component
                                namePrefix={uiHelper.makeName(this.props.namePrefix, i)}
                                {...{[this.props.objName]: data}}
                                onChange={this.props.onChange}
                        />
                    </Panel>
                ]
            )
        }

        render = () => {
            return (
                <div>
                    <Collapse
                            accordion={true}
                            activeKey={this.state.activeKey}
                            onChange={this.onPanelClick}
                    >
                        {this.getPanels()}
                    </Collapse>

                    <hr className="hr1" />

                    <div className="clearfix">
                        <div className="l_span_8">
                            <button type="button" className="btn btn_secondary btn_small" onClick={this.onAddMore}>
                                Add Another {this.props.objName}
                            </button>
                        </div>

                        <div className="l_span_4 l_last text-right">
                            <a className="link" href="#" onClick={this.onCollapseAll}>
                                Collapse all
                            </a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default formSectionAddDecor

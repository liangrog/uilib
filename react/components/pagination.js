import React from 'react'


class Pagination extends React.Component {

    constructor(props) {
        super(props)
    }

    changePerPage = (e) => {
        this.props.onChangePerPage(parseInt(e.target.value))
    }

    changeCurPage = (e) => {
        let toPage = parseInt(e.target.value)
        if (toPage >= 1 && toPage <= this.props.maxPage) {
            this.props.onChangeCurPage(toPage)
        }
    }

    nextPage = (e) => {
        e.preventDefault()
        if (this.props.curPage < this.props.maxPage) {
            this.props.onChangeCurPage(this.props.curPage + 1)
        }
    }

    prevPage = (e) => {
        e.preventDefault()
        if (this.props.curPage > 1) {
            this.props.onChangeCurPage(this.props.curPage - 1)
        }
    }

    render = () => {
        if (this.props.maxPage <= 0) {
            return null
        }

        return (
            <div className="product_listing_sort listing_bottom">
                <div className="product_listing_sort_field">
                    <div className="l_span_6">
                        <div className="l_span_1">
                            <span className="view">View</span>
                        </div>
                        <div className="l_span_3">
                            <div className="select_wrap">
                                <select value={this.props.perPage} onChange={this.changePerPage}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                        </div>
                        <div className="l_span_2">
                            <span className="per_page">per page</span>
                        </div>
                    </div>
                    <div className="pgn l_span_6 l_last">
                        <a href="#" className="i_prev" onClick={this.prevPage} disabled={this.props.curPage === 1}>
                            <span>prev</span>
                        </a>
                        <span className="current">
                            <input type="number"
                                    className="input-text"
                                    value={this.props.curPage}
                                    onChange={this.changeCurPage}
                                    maxLength="3"
                            />
                        </span>
                        <a href="#" className="i_next" onClick={this.nextPage} disabled={this.props.curPage === this.props.maxPage}>
                            <span>next</span>
                        </a>
                        <span className="total_pgn">
                            of {this.props.maxPage} {(this.props.maxPage > 1) ? 'pages' : 'page'}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

Pagination.propTypes = {
    curPage: React.PropTypes.number.isRequired,
    perPage: React.PropTypes.number.isRequired,
    maxPage: React.PropTypes.number.isRequired,
    onChangeCurPage: React.PropTypes.func.isRequired,
    onChangePerPage: React.PropTypes.func.isRequired
}

Pagination.defaultProps = {
}

export default Pagination

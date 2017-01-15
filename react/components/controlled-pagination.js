import React from 'react'

const Pagination = props => {

    if (props.maxPage <= 0) {
        return null
    }

    const changeCurPage = e => {
        const toPage = parseInt(e.target.value, 10)
        if (toPage >= 1 && toPage <= props.maxPage) {
            props.onChangeCurPage(toPage)
        }
    }

    const nextPage = e => {
        e.preventDefault()
        if (props.curPage < props.maxPage) {
            props.onChangeCurPage(props.curPage + 1)
        }
    }

    const prevPage = e => {
        e.preventDefault()
        if (props.curPage > 1) {
            props.onChangeCurPage(props.curPage - 1)
        }
    }

    return (
        <div className="product_listing_sort listing_bottom">
            <div className="product_listing_sort_field">
                <div className="pgn l_span_6 l_last">
                    <a href="#" className="i_prev" onClick={prevPage} disabled={props.curPage === 1}>
                        <span>prev</span>
                    </a>
                    <span className="current">
                        <input type="number"
                            className="input-text"
                            value={props.curPage}
                            onChange={changeCurPage}
                            maxLength="3"
                        />
                    </span>
                    <a href="#" className="i_next" onClick={nextPage} disabled={props.curPage === props.maxPage}>
                        <span>next</span>
                    </a>
                    <span className="total_pgn">
                        of {props.maxPage} {(props.maxPage > 1) ? 'pages' : 'page'}
                    </span>
                </div>
            </div>
        </div>
    )
}

Pagination.propTypes = {
    curPage: React.PropTypes.number.isRequired,
    maxPage: React.PropTypes.number.isRequired,
    onChangeCurPage: React.PropTypes.func.isRequired
}

Pagination.defaultProps = {
    curPage: 0,
    maxPage: 0
}

export default Pagination

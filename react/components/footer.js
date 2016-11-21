import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        let items = this.props.items.map(function(item) {
            return (
                <div className="footer_col l_span_2" key={item.href}>
                    <h5>
                        <Link to={item.href} activeClassName="active" onlyActiveOnIndex={true}>
                            {item.title}
                        </Link>
                    </h5>
                </div>
            )
        })
        return (
            <footer className="footer">
                <div className="l_grid">
                    <div className="footer_extra">
                        <article className="footer_contact"></article>
                    </div>
                    <div className="footer_main l_span_10">
                        { items }
                    </div>
                    <div className="footer_bottom l_span_2 l_last">
                        <div className="footer_col l_last">
                            <h5>
                                <a href="#" title="Email Support">Email Support</a>
                            </h5>
                        </div>
                    </div>
                    <hr className="hr1" />
                    <div className="footer_copyright">
                        <div className="l_span_6">&copy; Merlin Skill Mobility Pte Ltd 2016</div>
                        <div className="l_span_6 l_last text_right footer_bottom">
                            <ul>
                                <li>
                                    <a href="#" title="Terms &amp; Conditions">Terms &amp; Conditions</a>
                                </li>
                                <li>
                                    <a href="#" title="Privacy Policy">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }    
}

Footer.propTypes = {
    items: PropTypes.array
}

export default Footer
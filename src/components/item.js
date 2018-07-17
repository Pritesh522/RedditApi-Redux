import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { togglePin } from '../actions/items';


class Item extends Component {
    render() {
        const pStyle = {
            fontSize: '16px'
        };
        const href = 'https://www.reddit.com' + this.props.data.permalink;

        return (
            <li>
                {
                    this.props.data.pinned
                        ? <i style={pStyle} className="fa fa-star" onClick={() => this.handleClick(this.props.data.id, false)}></i>
                        : <i style={pStyle} className="fa fa-star-o" onClick={() => this.handleClick(this.props.data.id, true)}></i>
                }
                <a target='_blank' href={href}>{this.props.data.title}</a>
            </li>);
    }

    handleClick(id, isPinnded) {
        this.props.togglePin(id, isPinnded);
    }
}


Item.propTypes = {
    togglePin: PropTypes.func.isRequired,
    data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        pinned: React.PropTypes.bool.isRequired,
        permalink: React.PropTypes.string.isRequired
    })
};

const mapDispatchToProps = (dispatch) => {
    return {
        togglePin: (id, isPinnded) => dispatch(togglePin(id, isPinnded))
    };
};

export default connect(null, mapDispatchToProps)(Item);

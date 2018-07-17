import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, togglePin } from '../actions/items';
import Item from './item';

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div>
                <ul>
                    {this.props.items.map((item) => (
                        (item.data.pinned) ? <Item key={item.data.id} data={item.data} /> : ''
                    ))}
                </ul>

                <ul>
                    {this.props.items.map((item) => (
                        (!item.data.pinned) ? <Item key={item.data.id} data={item.data} /> : ''
                    ))}
                </ul>
            </div>
        );
    }

    handleClick(id, isPinnded) {
        this.props.togglePin(id, isPinnded);
    }
}


ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    togglePin: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(itemsFetchData()),
        togglePin: (id, isPinnded) => dispatch(togglePin(id, isPinnded))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);

import React, { Component } from 'react';

class ItemList extends Component {
    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div>
                {this.props.items.map((item, i) => (
                    <div key={i} className='songContainer'>
                        <div>
                            <img src={item.imageURL} alt='BAD' />
                        </div>
                        <div>
                            <p>{item.artist}</p>
                            <p>{item.album}</p>
                            <p>{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ItemList;

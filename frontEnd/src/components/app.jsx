import React, {Component} from 'react';
import Headers from "./common/headers";
import Footers from "./common/footers";

//For Others route calling this layout
class Layout extends Component {
    render() {
        return (
            <>
                <Headers/>
                {this.props.children}
                <Footers/>
            </>
        );
    }
}

export default Layout;

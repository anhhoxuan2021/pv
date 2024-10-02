import React from 'react';
import CAllbackTest from '../../components/test/CallbackTest';
import NotCallbackTest from '../../components/test/NotCallbackTest';
import NotUseMemo from '../../components/test/NotUseMemo';
import UseMemoTest from '../../components/test/UseMemo'
import Timer from '../../components/test/EffectTest';

import ReactTestMemo from '../../components/test/ReactTestMemo';

class Test extends React.Component {
    render() {
        return(
            <>
            <ReactTestMemo />
            <div className='row'>
                <div className='col flex-row'>
                    <div> Test render</div>
                    <NotCallbackTest />
                </div>

            </div>
            </>
        )
    }
}

export default Test;
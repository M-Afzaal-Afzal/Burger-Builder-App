import React from 'react'
import Enzyme from 'enzyme';

import {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

Enzyme.configure({ adapter: new Adapter() });

describe('<NavigationItems/>', () => {
    it('should render two navigation item elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
})


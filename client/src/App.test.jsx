import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow } from 'enzyme';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter()});

test('renders without error', () => {
    const wrapper = shallow(<App />);
    const appComponent = wrapper.find('[data-test="component-app"]');
    expect(appComponent.length).toBe(1);
});

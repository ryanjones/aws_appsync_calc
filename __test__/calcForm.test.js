import React from 'react';
import { mount } from 'enzyme';
import CalcForm from '../src/components/CalcForm';

test('Performs the correct calculation based on the sample', () => {
  const wrapper = mount(<CalcForm/>);
  wrapper.find('button').simulate('click');

  expect(wrapper.state()["totalCost"]).toEqual("15.52");
});

test('Performs the correct calculation based on manual entry', () => {
  const wrapper = mount(<CalcForm/>);

  let operations = wrapper.find("Input").filter({ name: 'operations'})
  operations.prop('onChange')({ target: { name: 'operations', value: 1000 } })

  let transferCharges = wrapper.find("Input").filter({ name: 'transferCharges'})
  transferCharges.prop('onChange')({ target: { name: 'transferCharges', value: 2.4 } })

  let realTimeUpdates = wrapper.find("Input").filter({ name: 'realTimeUpdates'})
  realTimeUpdates.prop('onChange')({ target: { name: 'realTimeUpdates', value: 1000 } })

  let connectionMinutes = wrapper.find("Input").filter({ name: 'connectionMinutes'})
  connectionMinutes.prop('onChange')({ target: { name: 'connectionMinutes', value: 1500 } })
  
  let userCount = wrapper.find("Input").filter({ name: 'userCount'})
  userCount.prop('onChange')({ target: { name: 'userCount', value: 2500 } })

  expect(wrapper.state()["totalCost"]).toEqual("15.52");
});

test("Doesn't calculate unless all fields are populated", () => {
  const wrapper = mount(<CalcForm/>);

  let operations = wrapper.find("Input").filter({ name: 'operations'})
  operations.prop('onChange')({ target: { name: 'operations', value: '' } })

  expect(wrapper.state()["totalCost"]).toEqual(0);
});
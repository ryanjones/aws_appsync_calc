import { mount } from 'enzyme';
import CalcForm from '../src/components/CalcForm';

test('Performs the correct calculation based on the sample', () => {
  const wrapper = mount(<CalcForm />);
  wrapper.find('button').simulate('click');

  let waffles = wrapper.find("input[name='totalCost']").props().value as Number;

  expect(waffles).toEqual(15.52);
});

test('Performs the correct calculation based on manual entry', () => {
  const wrapper = mount(<CalcForm />);

  // name is a mandatory field or the event won't be triggered
  wrapper.find("input[name='operations']").simulate('change', { target: { name: 'operations', value: 1000 } })
  wrapper.find("input[name='transferCharges']").simulate('change', { target: { name: 'transferCharges', value: 2.4 } })
  wrapper.find("input[name='realTimeUpdates']").simulate('change', { target: { name: 'realTimeUpdates', value: 1000 } })
  wrapper.find("input[name='connectionMinutes']").simulate('change', { target: { name: 'connectionMinutes', value: 1500 } })
  wrapper.find("input[name='userCount']").simulate('change', { target: { name: 'userCount', value: 2500 } })

  let cost = wrapper.find("input[name='totalCost']").props().value as Number;
  expect(cost).toEqual(15.52)
});

test("Doesn't calculate unless all fields are populated", () => {
  const wrapper = mount(<CalcForm />);

  wrapper.find("input[name='operations']").simulate('change', { target: { name: 'operations', value: 1000 } })

  let cost = wrapper.find("input[name='totalCost']").props().value as Number;

  expect(cost).toEqual(0);
});

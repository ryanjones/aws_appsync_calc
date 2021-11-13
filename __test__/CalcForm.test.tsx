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

  //wrapper.find("input[name='operations']").props().value = 1000;
  // wrapper.find("input[name='transferCharges']").props().value = 2.4;
  // wrapper.find("input[name='realTimeUpdates']").props().value = 1000;
  // wrapper.find("input[name='connectionMinutes']").props().value = 1500;
  // wrapper.find("input[name='userCount']").props().value = 2500;

  // wrapper.find("input[name='operations']").simulate('change', { target: { value: 1000 } })
  // wrapper.find("input[name='transferCharges']").simulate('change', { target: { value: 2.4 } })
  // wrapper.find("input[name='realTimeUpdates']").simulate('change', { target: { value: 1000 } })
  // wrapper.find("input[name='connectionMinutes']").simulate('change', { target: { value: 1500 } })
  // wrapper.find("input[name='userCount']").simulate('change', { target: { value: 2500 } })

  let operations = wrapper.find("input[name='operations']").instance() as unknown as HTMLInputElement;
  operations.value = '2500';

  let transferCharges = wrapper.find("input[name='transferCharges']").instance() as unknown as HTMLInputElement;
  transferCharges.value = '2.4'

  let realTimeUpdates = wrapper.find("input[name='realTimeUpdates']").instance() as unknown as HTMLInputElement;
  realTimeUpdates.value = '1000'

  let connectionMinutes = wrapper.find("input[name='connectionMinutes']").instance() as unknown as HTMLInputElement;
  connectionMinutes.value = '1000'

  let userCount = wrapper.find("input[name='userCount']").instance() as unknown as HTMLInputElement;
  userCount.value = '2500';

  userCount.simulate('change');

  let waffles = wrapper.find("input[name='totalCost']").props().value as Number;
  expect(waffles).toEqual(15.52)

  // Still 0, change event doesn't seem to be triggered at all.
  // wrapper.find("input").instance().value = "abc";

});

// test("Doesn't calculate unless all fields are populated", () => {
//   const wrapper = mount(<CalcForm />);

//   const operationsEvent = {
//     currentTarget: {
//       value: '1000',
//     },
//   } as ChangeEvent<HTMLInputElement>;

//   let operations = wrapper.find("Input").filter({ name: 'operations' })
//   operations.prop('onChange')(operationsEvent)

//   expect(wrapper.state()["totalCost"]).toEqual(0);
// });



// const operationsEvent = {
//   currentTarget: {
//     value: '1000',
//   },
// } as ChangeEvent<HTMLInputElement>;

// const transferChargesEvent = {
//   currentTarget: {
//     value: '2.4',
//   },
// } as ChangeEvent<HTMLInputElement>;

// const realTimeUpdatesEvent = {
//   currentTarget: {
//     value: '1000',
//   },
// } as ChangeEvent<HTMLInputElement>;

// const connectionMinutesEvent = {
//   currentTarget: {
//     value: '1500',
//   },
// } as ChangeEvent<HTMLInputElement>;

// const userCountEvent = {
//   currentTarget: {
//     value: '2500',
//   },
// } as ChangeEvent<HTMLInputElement>;

// let operations = wrapper.find("Input").filter({ name: 'operations' })
// operations.prop('onChange')(operationsEvent)

// let transferCharges = wrapper.find("Input").filter({ name: 'transferCharges' })
// transferCharges.prop('onChange')(transferChargesEvent)

// let realTimeUpdates = wrapper.find("Input").filter({ name: 'realTimeUpdates' })
// realTimeUpdates.prop('onChange')(realTimeUpdatesEvent)

// let connectionMinutes = wrapper.find("Input").filter({ name: 'connectionMinutes' })
// connectionMinutes.prop('onChange')(connectionMinutesEvent)

// let userCount = wrapper.find("Input").filter({ name: 'userCount' })
// userCount.prop('onChange')(userCountEvent)

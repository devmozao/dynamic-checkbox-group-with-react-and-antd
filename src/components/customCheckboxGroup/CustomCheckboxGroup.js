// imports
import React, { useState, useEffect } from 'react'
import { Checkbox, Col, Row } from 'antd'
// css import
import './CustomCheckboxGroup.css'

// main component with props destructuring
const CustomCheckboxGroup = ({ values, defaultCheckedList, groupState }) => {
  // inner state to manipulate their values
  // lets talk about this object and his values:
  // values: is a list that must receive all checkbox that will be displayed
  // checkedList: a list with values that will be checked when component mount
  // indeterminated: the header checkbox condition to display when partial checkbox are selected. starts with false as none is selected
  // checkall: a boolean that indicates that all checkboxes is selected
  const [state, setState] = useState({
    values: [],
    checkedList: [],
    indeterminate: false,
    checkAll: false
  })
  // state that holds all checkbox values that could be checked when pressed the header checkbox "select all"
  const [allValuesChecked, setAllValuesChecked] = useState([])

  // when component loads and it have props(value) triggered, it should mount values to be displayed
  // this maneuver is good because, if you mutate the props at the container (ex: filter field, debounce), the component are auto updated
  useEffect(() => {
    if (values) {
      const formattedValues = values.map(value => {
        return ({ label: value.type_name, value: value.id })
      })
      const formattedCheckedList = defaultCheckedList.map(value => { return value.id })
      setAllValuesChecked(() => {
        return values.map(value => { return value.id })
      })
      setState({
        values: formattedValues,
        checkedList: formattedCheckedList,
        indeterminate: !!formattedCheckedList,
        checkAll: false
      })
    }
  }, [values])

  // everytime inner state mutates, it sends the value back to the container's state
  useEffect(() => {
    if (groupState) {
      groupState({ ...state })
    }
  }, [state])

  // function that is triggered everytime the checkbox is selected
  // after triggering, it updates the inner state with actual value
  function onChange (checkedList) {
    return setState({
      ...state,
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < values.length,
      checkAll: checkedList.length === values.length
    })
  }

  // function that is triggered everytime the "select all" is selected
  // after triggering, it updates the inner state with the values selected
  function onCheckAllChange (e) {
    return setState({
      ...state,
      checkedList: e.target.checked ? allValuesChecked : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }

  // main component
  return (
    <>
      <Row>
        <Col span={16} className='outer-border'>
          <div className='ant-checkbox-group-item'>
            <Checkbox
              className='checkbox-header'
              indeterminate={state.indeterminate}
              onChange={onCheckAllChange}
              checked={state.checkAll}
            >
              {state.checkAll ? 'Uncheck All' : 'Check All'}
            </Checkbox>
          </div>
          <Checkbox.Group
            className='checkbox-group'
            options={state.values}
            value={state.checkedList}
            onChange={onChange}
          />
        </Col>
      </Row>
    </>
  )
}

export default CustomCheckboxGroup

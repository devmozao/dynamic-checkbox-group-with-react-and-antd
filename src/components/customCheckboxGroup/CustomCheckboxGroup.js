// imports
import React, { useState, useEffect } from 'react'
import { Checkbox, Col, Row } from 'antd'
// css import
import './CustomCheckboxGroup.css'

// const CheckboxGroup = Checkbox.Group

const CustomCheckboxGroup = ({ values, defaultCheckedList, groupState }) => {
  const [state, setState] = useState({
    values: [],
    checkedList: [],
    indeterminate: false,
    checkAll: false
  })
  const [allValuesChecked, setAllValuesChecked] = useState([])

  useEffect(() => {
    if (values) {
      const formattedValues = values.map(value => {
        return new Object({ label: value.type_name, value: value.id })
      })
      const formattedCheckedList = defaultCheckedList.map(value => { return value.id })
      setAllValuesChecked(() => {
        return values.map(value => { return value.id })
      })
      setState({
        values: formattedValues,
        checkedList: formattedCheckedList,
        indeterminate: false,
        checkAll: false
      })
    }
  }, [values])

  useEffect(() => {
    if (groupState) {
      groupState({ ...state })
    }
  }, [state])

  function onChange (checkedList) {
    return setState({
      ...state,
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < values.length,
      checkAll: checkedList.length === values.length
    })
  }

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
              {state.checkAll ? 'Desmarcar Todos' : 'Selecionar Todos'}
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

import React, { useState, memo } from 'react'
import { RequestForm } from '../RequestForm'

interface RequestFormProps {
  onClose: () => void
  open: boolean
  id?: string | number
}
export interface RequestForm {
  name: string
  categoryId: number
  description?: string
  startDate: Date
  endDate: Date
}

const RequestCreateForm = ({ onClose, open, id }: RequestFormProps) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <RequestForm
      onClose={onClose}
      open={open}
      id={id}
      dateFrom={startDate}
      dateTo={endDate}
      submitBtnName={'New request'}
      formName={'Create request'}
    />
  )
}
export default memo(RequestCreateForm)

import './createReport.css'
const IncomeTable = (props) => {
  const date = props.obj.year + '/' + props.obj.month + '/' + props.obj.date
  const amount = props.obj.amount
  const description = props.obj.description
  const type = props.obj.type
  const rate = props.rate

  const row = () => {
    if (type === 'income') {
      return (
        <tr>
          <td className='text-dark'>{date}</td>
          <td className='text-dark'>{description}</td>
          <td className='text-dark'>{rate * parseFloat(amount).toFixed(2)}</td>
        </tr>
      )
    }
  }
  return <>{row()}</>
}

export default IncomeTable

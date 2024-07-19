import React from 'react'
import Navbar from '../components/Navbar'
import Controls from '../components/Controls'
import DSR_Table from '../components/DSR_Table'

const DSR = () => {
  const columns = [
    { header: 'Sr. No', accessor: 'srNo' },
    { header: 'Component Name', accessor: 'componentName' },
    { header: 'Configuration', accessor: 'config' },
    { header: 'Model', accessor: 'model' },
    { header: 'POD', accessor: 'pod' },
    { header: 'Vendor', accessor: 'vendor' },
    { header: 'Purchase Order Number', accessor: 'purchaseOrderNum' },
    { header: 'Total Price', accessor: 'totalPrice' },
    { header: 'Per Unit Price', accessor: 'perUnitPrice' },
    { header: 'Balance Amount', accessor: 'balanceAmt' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Status', accessor: 'status' },
    { header: 'Location of Component', accessor: 'locationOfComponent' },
    { header: 'Validated By', accessor: 'validatedBy' },
    { header: 'Comments', accessor: 'comments' }
  ];
  return (
    <>
    <Navbar/>
    <Controls/>
    {/* <DSR_Table columns={columns}
        data={data}/> */}
    </>
  )
}

export default DSR
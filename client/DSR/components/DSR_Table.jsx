import React, { useState } from 'react';
import Modal from 'react-modal';

const DSR_Table = ({ columns, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    srNo: '',
    componentName: '',
    config: '',
    model: '',
    pod: '',
    vendor: '',
    purchaseOrderNum: '',
    totalPrice: '',
    perUnitPrice: '',
    balanceAmt: '',
    quantity: '',
    status: '',
    locationOfComponent: '',
    validatedBy: '',
    comments: ''
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const columnStyles = {
    componentName: {
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      width: '200px'
    },
    purchaseOrderNum: {
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      width: '150px'
    },
    locationOfComponent: {
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      width: '200px'
    }
  };

  return (
    <div className="p-4">
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="bg-white p-8 rounded shadow-md mx-auto my-4 w-1/2 max-h-screen overflow-y-auto">
        <h2 className="text-2xl mb-4">Add New Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {columns.map((column) => (
            <div key={column.accessor} className="flex flex-col">
              <label className="mb-1">{column.header}</label>
              <input
                type="text"
                name={column.accessor}
                value={formData[column.accessor] || ''}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
            </div>
          ))}
          <div className="flex space-x-4">
            <button type="submit" className="bg-green-500 text-white p-2 rounded">Submit</button>
            <button type="button" onClick={closeModal} className="bg-red-500 text-white p-2 rounded">Cancel</button>
          </div>
        </form>
      </Modal>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white content-center table-auto">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.accessor} className="text-[13px] py-2 px-2 bg-gray-100 border border-neutral-600 mb-2" style={columnStyles[column.accessor] || {}}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className='text-[11px]'>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className='content-center hover:bg-slate-100'>
                {columns.map((column) => (
                  <td key={column.accessor} className="py-2 mt-2 border border-neutral-600 px-2 border-collapse" style={columnStyles[column.accessor] || {}}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DSR_Table;

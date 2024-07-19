import React, { useState } from 'react';
import Modal from 'react-modal'
import AddEditEntries from './AddEditEntries';

const Controls = ({ onAdd, onSelectLab, onSelectSection, onExport }) => {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedLab, setSelectedLab] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  // State to manage the modal's visibility and type (add or edit)
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const handleAdd = () => {
    setOpenAddEditModal( {
      isShown: true,
      type: "add",
      data: null
    });
  };

  const handleSelectDept = (event) => {
    setSelectedDept(event.target.value);
    onSelectDept(event.target.value);
  };
  const handleSelectLab = (event) => {
    setSelectedLab(event.target.value);
    onSelectLab(event.target.value);
  };

  const handleSelectSection = (event) => {
    setSelectedSection(event.target.value);
    onSelectSection(event.target.value);
  };

  const handleExport = () => {
    onExport(selectDept, selectedLab, selectedSection);
  };

  const closeModal = () => {
    setOpenAddEditModal({
      isShown: false,
      type: 'add',
      data: null,
    });
  };

  return (
    <div className="p-4 flex flex-row items-center justify-evenly space-x-4">
      <button 
        onClick={handleAdd} 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-1/4"
      >
        Add New Entry
      </button>

      <Modal 
        isOpen={openAddEditModal.isShown}
        onRequestClose={ closeModal }
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(3px)'
          },
        }}
        contentLabel='Add/Edit Entry'
        className='w-[95%] max-h-[95%] bg-white rounded-md mx-auto mt-5 p-2 overflow-y-scroll '
      >


        <AddEditEntries 
          type={openAddEditModal.type}
          entryData={openAddEditModal.data}
          onClose = {closeModal }
        />

      </Modal>

      <select 
        value={selectedDept} 
        onChange={handleSelectDept} 
        className="block p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/4">
        <option value="" disabled>Select Department</option>
        <option value="Lab A">INFT</option>
        <option value="Lab B">CMPN</option>
        {/* Add more labs as needed */}
      </select>

      <select 
        value={selectedLab} 
        onChange={handleSelectLab} 
        disabled={!selectedDept}
        className="block p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/4">
        <option value="" disabled>Select Lab</option>
        <option value="Lab A">Lab A</option>
        <option value="Lab B">Lab B</option>
        <option value="Lab C">Lab C</option>
        {/* Add more labs as needed */}
      </select>

      <select 
        value={selectedSection} 
        onChange={handleSelectSection} 
        disabled={!selectedLab}
        className="block p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/4">
        <option value="" disabled>Select Section</option>
        <option value="Section A">Section A</option>
        <option value="Section B">Section B</option>
        <option value="Section C">Section C</option>
        {/* Add more sections as needed */}
      </select>

      <button 
        onClick={handleExport} 
        disabled={selectedDept || !selectedLab || !selectedSection}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed w-1/4">
        Export to PDF
      </button>


    </div>
  );
};

export default Controls;

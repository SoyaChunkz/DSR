import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Controls from '../components/Controls';
import DSR_Table from '../components/DSR_Table';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // Ensure you have this import if you're using axiosInstance

const DSR = () => {
  const [allEntries, setAllEntries] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [department, setDepartment] = useState('');
  const [lab, setLab] = useState('');
  const [section, setSection] = useState('');
  const navigate = useNavigate();

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllEntries(department, lab, section);
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        setDepartment(response.data.user.department || '');
        setLab(response.data.user.lab || '');
        setSection(response.data.user.section || '');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  const getAllEntries = async (department, lab, section) => {
    try {
      const response = await axiosInstance.get("/get-all-entries", {
        params: { 
            department: department,
            lab: lab,
            section: section
         }
      });
      if (response.data && response.data.entries) {
        setAllEntries(response.data.entries);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again later.");
    }
  }

  const onSearchEntry = async (query) => {
    try {
      const response = await axiosInstance.get("/search-entries", {
        params: { query }
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllEntries(response.data.entries);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserInfo();
    getAllEntries(department, lab, section);
  }, []);

  const handleConfirm = () => {
    getAllEntries(department, lab, section);
  };

  const columns = [
    { header: 'Sr No', accessor: 'srNo' },
    { header: 'Component Name', accessor: 'componentName' },
    { header: 'Configuration', accessor: 'config' },
    { header: 'Model', accessor: 'model' },
    { header: 'POD', accessor: 'pod' },
    { header: 'Vendor', accessor: 'vendor' },
    { header: 'Purchase Order No.', accessor: 'purchaseOrderNum' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Per Unit Price', accessor: 'perUnitPrice' },
    { header: 'Total Price', accessor: 'totalPrice' },
    { header: 'Balance Amt', accessor: 'balanceAmt' },
    { header: 'Status', accessor: 'status' },
    { header: 'Location Of Component', accessor: 'locationOfComponent' },
    { header: 'Validated By', accessor: 'validatedBy' },
    { header: 'Comments', accessor: 'comments' }
  ];

  return (
    <>
      <Navbar 
        userInfo={userInfo} 
        onSearchEntry={onSearchEntry}
        handleClearSearch={handleClearSearch}
      />
      <Controls
        selectedDept={department}
        selectedLab={lab}
        selectedSection={section}
        onSelectDept={setDepartment}
        onSelectLab={setLab}
        onSelectSection={setSection}
        onConfirm={handleConfirm}
        onExport={(department, lab, section) => {/* Implement export logic here */}}
      />
      <DSR_Table columns={columns} data={allEntries} />
    </>
  )
}

export default DSR;

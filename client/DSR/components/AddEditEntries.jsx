import React, { useState } from 'react';

const AddEditEntries = ({ type, entryData, onClose }) => {
  const [srNo, setSrNo] = useState('');
  const [componentName, setComponentName] = useState('');
  const [config, setConfig] = useState('');
  const [model, setModel] = useState('');
  const [pod, setPod] = useState('');
  const [vendor, setVendor] = useState('');
  const [purchaseOrderNum, setPurchaseOrderNum] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [perUnitPrice, setPerUnitPrice] = useState('');
  const [balanceAmt, setBalanceAmt] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('');
  const [locationOfComponent, setLocationOfComponent] = useState('');
  const [validatedBy, setValidatedBy] = useState('');
  const [comments, setComments] = useState('');

  const [error, setError] = useState(null);

  const handleAddEntry = ()=> {

    if(!srNo){
        setError("Please enter the Serial Number")
        return;
    }
    if(!componentName){
        setError("Please enter the component's name")
        return;
    }
    if(!config){
        setError("Please enter the component's configuration")
        return;
    }
    if(!model){
        setError("Please enter the component's model no.")
        return;
    }
    if(!pod){
        setError("Please enter the component's POD")
        return;
    }
    if(!vendor){
        setError("Please enter the component's vendor details")
        return;
    }
    if(!purchaseOrderNum){
        setError("Please enter the component's purchase order number")
        return;
    }
    if(!totalPrice){
        setError("Please enter the component's total price")
        return;
    }
    if(!balanceAmt){
        setError("Please enter the balance amount")
        return;
    }
    if(!quantity){
        setError("Please enter the quantity of component")
        return;
    }
    if(!status){
        setError("Please enter the component's status")
        return;
    }
    if(!locationOfComponent){
        setError("Please enter the component's location")
        return;
    }
    if(!validatedBy){
        setError("Please enter the name of the Validator")
        return;
    }

    setError("");

    if(type === "edit"){
        editNote();
    }
    else{
        addNewNote();
    }
}

  return (
    <div className='relative p-3 flex-col'>
      <button 
        onClick={onClose} 
        className='w-8 h-8 rounded-md flex items-center justify-center absolute -top-2 -right-2'>
        ❌
      </button>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Serial Number</label>
          <input 
            type='number'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add a serial number'
            value={srNo}
            onChange={({ target }) => setSrNo(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Component Name</label>
          <input 
            type='text'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the component name'
            value={componentName}
            onChange={({ target }) => setComponentName(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Configuration</label>
          <input 
            type='text'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the configuration'
            value={config}
            onChange={({ target }) => setConfig(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Model</label>
          <input 
            type='text'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the model'
            value={model}
            onChange={({ target }) => setModel(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Purchase Date</label>
          <input 
            type='date'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            value={pod}
            onChange={({ target }) => setPod(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Vendor</label>
          <input 
            type='text'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the vendor'
            value={vendor}
            onChange={({ target }) => setVendor(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Purchase Order Number</label>
          <input 
            type='number'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the purchase order number'
            value={purchaseOrderNum}
            onChange={({ target }) => setPurchaseOrderNum(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Total Price</label>
          <input 
            type='number'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the total price'
            value={totalPrice}
            onChange={({ target }) => setTotalPrice(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Per Unit Price</label>
          <input 
            type='number'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the per unit price'
            value={perUnitPrice}
            onChange={({ target }) => setPerUnitPrice(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Balance Amount</label>
          <input 
            type='number'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the balance amount'
            value={balanceAmt}
            onChange={({ target }) => setBalanceAmt(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Quantity</label>
          <input 
            type='number'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the quantity'
            value={quantity}
            onChange={({ target }) => setQuantity(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Status</label>
          <input 
            type='text'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the status'
            value={status}
            onChange={({ target }) => setStatus(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Location of Component</label>
          <input 
            type='text'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none placeholder:text-lg'
            placeholder='Add the location of component. In case of multiple components add location followed by ","'
            value={locationOfComponent}
            onChange={({ target }) => setLocationOfComponent(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='input-label text-lg text-slate-500'>Validated By</label>
          <input 
            type='text'
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add the name of the person who validated'
            value={validatedBy}
            onChange={({ target }) => setValidatedBy(target.value)}
          />
        </div>

        <div className='flex flex-col gap-2 col-span-2'>
          <label className='input-label text-lg text-slate-500'>Comments</label>
          <textarea 
            className='text-xl text-slate-950 bg-slate-100  border rounded-md  border-neutral-700 p-2 outline-none'
            placeholder='Add any comments'
            value={comments}
            onChange={({ target }) => setComments(target.value)}
          />
        </div>
      </div>

      <div className='w-fit mx-auto'>
        {
            error && 
                <p className='text-red-500 pt-3 text-sm'>
                    {error}
                </p>
        }
      </div>

      <div className='w-fit mx-auto'>

        <button className='w-40 text-base text-white font-medium mt-3 bg-blue-500 hover:bg-blue-600 border rounded-md p-2 hover:scale-95 transition-all ease-in-out' 
            onClick={ handleAddEntry }
        >
        {type === "edit" ? "UPDATE" : "ADD"} 
        </button>
      </div>
      
    </div>
  );
};

export default AddEditEntries;

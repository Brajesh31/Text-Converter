import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'

function Converter() {

    let { register, handleSubmit, formState: { errors }, setValue } = useForm();

    let [inputText, setInputText] = useState(false);
    let [editMode, setEditMode] = useState(false);
    let [convert, setConvert] = useState('');

    const handleSubmition = (data) => {
        console.log('data: ', data);
        if (data.convert === 'upper') {
            setConvert(data.inputText.toUpperCase())
            setInputText(true)
        } 
        else if(data.convert === 'lower'){
            setConvert(data.inputText.toLowerCase())
            setInputText(true)
        }
        else if(data.convert === 'encode'){
            setConvert(btoa(data.inputText))
            setInputText(true)
        }
        else if(data.convert === 'decode'){
            setConvert(atob(data.inputText))
            setInputText(true)
        }
    }
    return (
        <div className='m-5 sm:m-10'>
            <div className='flex flex-col text-center content-center'>
                {
                    inputText && (
                        <div className='flex flex-col m-2 sm:ms-20 sm:me-20 mt-0'>
                            <h2 className='text-2xl font-bold text-left m-0'>Converted Text</h2>
                            <textarea className='outputText w-100 focus:outline-none' value={convert} name="inputText" id="inputText" cols="20" rows="5" readOnly></textarea>
                            <button className='bg-blue-500 mt-3 text-white font-bold py-2 px-4 rounded hover:bg-blue-400' onClick={() => {
                                setInputText(false)
                                setEditMode(true)
                            }
                            }>Edit</button>
                            <button className='bg-blue-500 mt-3 text-white font-bold py-2 px-4 rounded hover:bg-blue-400' onClick={() => {
                                setInputText(false)
                                setEditMode(false)
                            }
                            }>Convert more</button>
                        </div>
                    )
                }
                {
                    !inputText && (
                        <div>
                            <h2 className='text-2xl font-bold text-left m-2 sm:ms-20 sm:me-20'>Text to be converted</h2>
                            <form className='flex flex-col m-2 sm:ms-20 sm:me-20 mt-0' onSubmit={handleSubmit(handleSubmition)}>
                                {
                                    !editMode && (
                                        <textarea className='border-2 inputText border-black w-100 ' {...register('inputText',{required:true})} value={setValue('inputText', '')} name="inputText" id="inputText" cols="20" rows="5"></textarea>
                                    )
                                }
                                {
                                    editMode && (
                                        <textarea className='border-2 inputText border-black w-100 ' {...register('inputText',{required:true})}  value={setValue('inputText', convert)} name="inputText" id="inputText" cols="20" rows="5"></textarea>
                                    )
                                }
                                {
                                    errors.inputText && <span className='text-red-500 text-left mt-2'>Enter Some Text</span>
                                }
                                {/* Radio Buttons */}
                                <div className='flex flex-col text-left mt-3'>
                                    <div>
                                        <input type="radio" {...register('convert',{required:true})} name="convert" id="upper" value="upper" />
                                        <label htmlFor="upper" className='text-left m-2'>Upper Case</label>
                                    </div>
                                    <div>
                                        <input type="radio" {...register('convert',{required:true})} name="convert" id="lower" value="lower" />
                                        <label htmlFor="lower" className='text-left m-2'>Lower Case</label>
                                    </div>
                                    <div>
                                        <input type="radio" {...register('convert',{required:true})} name="convert" id="encode" value="encode" />
                                        <label htmlFor="encode" className='text-left m-2'>Encode Base64</label>
                                    </div>
                                    <div>
                                        <input type="radio" {...register('convert',{required:true})} name="convert" id="decode" value="decode" />
                                        <label htmlFor="decode" className='text-left m-2'>Decode Base64</label>
                                    </div>
                                </div>
                                {
                                    errors.convert && <span className='text-red-500 text-left mt-2'>Select an Option</span>
                                }
                                <button className='bg-blue-500 mt-3 text-white font-bold py-2 px-4 rounded hover:bg-blue-400' type='submit'>Convert</button>
                            </form>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Converter
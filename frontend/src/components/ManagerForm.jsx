import React from "react";
import { Link } from 'react-router-dom';



function ManagerForm() {
    return(
        <div className="px-16 py-6 bg-gray-100 md:col-span-2 min-h-screen flex flex-col">
           <div className="flex justify-center sm:justify-center md:justify-end">
                <Link
                    to = {'/login'}
                    className="text-primary btn border md:border-2 hover:bg-gray-400 hover:text-white"
                >
                    Login
                </Link>
                <Link
                    to ="/signup"
                    className="text-primary ml-2 btn border md:border-2 hover:bg-gray-400 hover:text-white"
                >
                    Sign up
                </Link>
            </div>
           
          <main className="flex flex-col items-center justify-center flex-1">
          <h5 className="text-2xl font-semibold mb-8 mt-4 border-b-2">Postani dio menadžer ekipe!</h5>     
                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first_name">
                                Ime
                            </label>
                            <input
                               type="text"
                               id="first_name"
                               name="first_name"
                          //     value={formData.first_name}
                          //     onChange={handleChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Jane"/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last_name">
                                Prezime
                            </label>
                            <input
                             type="text"
                             id="last_name"
                             name="last_name"
                           //   value={formData.last_name}
                           //  onChange={handleChange}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Doe"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  htmlFor="">
                               Naziv terena
                            </label>
                            <input 
                             type="text"
                             /* id=""
                              name=""
                              value={}
                              onChange={}
                            */
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Dvorana Mirza Delibašić"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="">
                             Lokacija terena
                            </label>
                            <input
                            //  type="text"
                            //  id=""
                            //  name=""
                            //  value={}
                            //  onChange={}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Sarajevo"/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  htmlFor="email">
                             Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                            //  value={}
                              //onChange={}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="primjer@nesto.email"/>
                        </div>
                    </div>
                  
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  htmlFor="" >
                               Kapacitet terena
                            </label>
                            <input 
                             type="number"
                             id=""
                             name=""
                             min="0"
                            // value={}
                            // onChange={}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  placeholder="6"/>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="">
                                Tip terena
                            </label>
                            <div className="relative">
                                <select 
                                 id=""
                                 name=""
                                 //value={}
                                // onChange={}
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option>Otvoreni </option>
                                    <option>Zatvorneni </option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="preferred_sport">
                                Sport
                            </label>
                            <div className="relative">
                                <select
                                   id="preferred_sport"
                                   name="preferred_sport"
                                //   value={formData.preferred_sport}
                                 //  onChange={handleChange}
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option>Futbal</option>
                                    <option>Košarka</option>
                                    <option>Odbojka</option>
                                    <option>Tenis</option>

                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mt-3">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                        <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                            Submit
                        </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default ManagerForm;
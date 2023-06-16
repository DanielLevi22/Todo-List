'use client'
import Image from 'next/image'
import Logo from '../assets/Logo.svg'
import ClipBoard from '../assets/ClipBoard.svg'
import Lixeira from '../assets/lixeira.svg'


import { ListType } from '@/types/ListType'
import { lista } from "@/List/List"
import { useState } from 'react'



export default function Home() {
  const  [Lista, setLista ] = useState< ListType[]>(lista)
  const  [inputSearch, setInputSearch] = useState('')

  
  function HandleSearchInput() {
    if(inputSearch == '') {
      return
    }
    setLista(previw =>[...previw,{id: Lista.length +1, name: inputSearch, active: false}])
    setInputSearch('')
  }

  function HandleDelete(id: number) {
    const newList = Lista.filter( item => item.id !== id)
    setLista(newList)
  }

  function HandleActive(id: number) {
    let newList = [...Lista]
    for (let i  in newList) {
      if(newList[i].id === id) {
        newList[i].active = !newList[i].active
    }
    setLista(newList)
  }
}

  let listactive =  Lista.filter( item => item.active === true)

  return (
    <main className="bg-[#1A1A1A] h-screen">
      <header className='bg-[#0D0D0D] h-[200px] flex items-center justify-center'>
        <Image src={Logo} alt='logo' priority />
      </header>
      
      <section className='max-w-[736px] m-auto -mt-8'>
        {/* input */}
          <div>
            <div className="flex gap-2">
              <input type="text" 
              className="p-4 flex-1 rounded-lg h-[54px] text-black"
              placeholder="Adicione uma tarefa"
              value={inputSearch} 
              onChange={e => setInputSearch(e.target.value)}
              />
              <button className="p-4 rounded-lg h-[54px] bg-blue-600" onClick={HandleSearchInput}>Criar</button>
            </div>

          </div>


          {/* todo list */}

          <div className='mt-[64px]'>
      {/* header list tarefas*/}
      <div className="flex justify-between pb-6">
        <div className='flex gap-3 items-center'>
          <span>Tarefas criadas</span>
          <span className='px-2 bg-[#333333] rounded-full'>{Lista.length}</span>
        </div>
        <div className='flex gap-3'>
          <span className='text-[#8284FA]'>Cocluidas</span>
          <span className='px-2 bg-[#333333] rounded-full'>{listactive.length} de {Lista.length}</span>
        </div>
      </div>

     {/* Lista */}
     
      <ul className="" >
        { Lista &&
          Lista.map( item =>(
            <li className="flex justify-between items-center h-[72px] p-4 mb-3 bg-[#262626] rounded-lg" key={item.id}>
            <input type="checkbox" className={`h-6 w-6 bg-transparent border-2 transition-all border-[#4EA8DE] ${item.active && 'border-0'}
            rounded-full ${item.active && 'text-[#5E60CE] '}`} id={item.id.toString()}  defaultChecked={item.active} onClick={() => HandleActive(item.id)}/>
            <label htmlFor={item.id.toString()} className={`${item.active && 'line-through'} ${item.active && 'text-gray-300'}`}>{item.name}</label>
            <span className='cursor-pointer' onClick={() => HandleDelete(item.id)}> <Image src={Lixeira} alt='lixo' /> </span>
           </li>
          
          ))
          }
        
      </ul>
      {  Lista.length === 0 &&
        <div className='mt-[64px] flex flex-col w-full items-center'>
        <div>
            <Image src={ClipBoard} alt='' className='block'/>
        </div>
        <p className='text-[#808080] font-bold'>Você ainda não tem tarefas cadastradas</p>
        <p className='text-[#333333]'>Crie tarefas e organize seus itens a fazer</p>

      </div>
      }
    


    </div>
        
      </section>

    </main>
  )
}

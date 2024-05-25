import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import { FaDollarSign } from "react-icons/fa6";
import { LuCircleDollarSign } from "react-icons/lu";
import { GrUserManager } from "react-icons/gr";

function Home() {
  /*trebala bi se staviti opcija da se odaberu drugačiji vremenski termini, pa da se na osnovu toga
  prikažu različiti grafovi (randomly generated data if needed, so long as gledanost ne premasuje kapacitet)*/
  /*ovo je graf koji prikazuje više terena u jednom vremenskom terminu, te kontrast između ukupne gledanosti i kapaciteta 
  svakog terena koji je organizovao meč u tom vremenskom terminu*/

  /*mozda kasnije da implementiramo funkciju koja ce sortirati sve linije po kapacitetu terena*/
    const data = [ /*funkcija koja treba da sprijeci pv (broj gledatelja) da premasi uv (kapacitet terena)*/
        {
          name: 'Stad A',
          kap: 200,
          gl: 150,
        },
        {
          name: 'Stad B',
          kap: 300,
          gl: 139,
          
        },
        {
          name: 'Stad C',
          kap: 270,
          gl: 180,
        },
        {
          name: 'Stad D',
          kap: 278,
          gl: 198,
        },
        {
          name: 'Stad E',
          kap: 189,
          gl: 110,
        },
        {
          name: 'Stad F',
          kap: 239,
          gl: 80,
        },
        {
          name: 'Stad G',
          kap: 149,
          gl: 30,
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title' id='glavna-ploca'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PROSJEČNA ZARADA (MJESEC)</h3>
                    <LuCircleDollarSign className='card_icon'/>
                </div>
                <h1>197.75 BAM</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>UKUPNA ZARADA</h3>
                    
                    <FaDollarSign className='card_icon'/>
                </div>
                <h1>2373.00 BAM</h1>
            </div>
            
            
        </div>

        

        <div class="card mb-4" id="menadzeri">
              <div class="card-header">
                Pretraživačka tabela
              </div>
              <div class="card-body">
                <div class="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                  <div class="datatable-top">
                  
                    <div class="datatable-search">
                      <input class="datatable-input" placeholder="Pretraži po imenu" type="search" title="Search within table">
                      </input>
                      <input class="datatable-input" placeholder="Pretraži po stadijumu" type="search" title="Search within table">
                      </input>
                    </div>
                    <div class="datatable-container">
                      <table id="datatablesSimple" class="datatable-table">
                      <thead>
                        <tr>
                          <th> 
                            Ime i prezime igrača
                          </th>
                          <th>
                            Ime stadijuma
                          </th>
                          <th>
                            Adresa
                          </th>
                          <th>
                            Grad
                          </th>
                          <th>
                            Igrač od: 
                          </th>
                          <th>
                            Igrač do:
                          </th>
                          <th>
                            Totalna zarada
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr data-index="0">
                          <td>Tiger Nixon</td>
                          <td>Stadijum A</td>
                          <td>Adresa A</td>
                          <td>Edinburgh</td>
                          <td>2011/04/25</td>
                          <td>--------</td>
                          <td>$320,800</td>
                        </tr>
                        <tr data-index="1">
                          <td>Tiger Nixon</td>
                          <td>Stadijum B</td>
                          <td>Adresa B</td>
                          <td>Edinburgh</td>
                          <td>2011/04/25</td>
                          <td>2022/04/24</td>
                          <td>$320,800</td>
                        </tr>
                        <tr data-index="2">
                          <td>Tiger Nixon</td>
                          <td>System Architect</td>
                          <td>Adresa C</td>
                          <td>Edinburgh</td>
                          <td>2011/04/25</td>
                          <td>--------</td>
                          <td>$320,800</td>
                        </tr>
                      </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
        </div>

        
    </main>
  )
}

export default Home

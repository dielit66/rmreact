import rmLogo from '../rm.png'
import './MainContent.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import {TextField} from "@mui/material";




function MainContent() {

    const [charData, setCharData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    let [currentPage, setCurrentPage] = useState(1)
    let [searchValue, setSearchValue] = useState('')
    let [speciesValue, setSpeciesValue] = useState('')
    let [genderValue, setGenderValue] = useState('')
    let [statusValue, setStatusValue] = useState('')
    const [totalPages, setTotalPages] =  useState(0)
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            if(!noData) {
                fetchData();
            }
        }
    }

    useEffect(  () => {

      const refreshData = async () => {
       const response = await axios('https://rickandmortyapi.com/api/character?page=1')
          setLoading(true)

          setRequestData(response.data)
          setCharData(response.data.results)
          setTotalPages(response.data.info.pages)

      }
            refreshData();
    },[]
    )
    useEffect(  () => {
console.log('inf')
            const refreshData = async () => {
                setCurrentPage(1)
                const response = await axios('https://rickandmortyapi.com/api/character?page=' + currentPage + '&name=' + searchValue + '&species=' + speciesValue + '&gender=' + genderValue + '&status=' + statusValue)
                if(response.data.info.next == null){setNoData(true)}
                setRequestData(response.data)
                setCharData(response.data.results)
                setTotalPages(response.data.info.pages)
                console.log(response)
            }
            refreshData();
        },[searchValue,speciesValue,genderValue,statusValue]
    )


    function fetchData() {
         setCurrentPage(currentPage + 1)
      axios
            .get(requestData.info.next)
            .then((response)=>{
                if(response.data.info.next == null){setNoData(true)}
                setLoading(true)
                setCharData(charData.concat(response.data.results))
                setRequestData(response.data)
            })
          .finally(()=>{
              setLoading(false)
          })
       console.log(charData)
    }

    return (

        <div className="main-content">
            <img alt={'Логотип123'} className={'rm-logo'} src={rmLogo}/>
<div className={'form-filter'}>
            <FormControl  sx={{ m: 1, minWidth: 120 }}    className={'filter-item'} >
                <TextField onChange={(e)=>{
                    setSearchValue(e.target.value)

                }
                }
                           type="search"   className={'search-input'} id="outlined-basic" label="Search" variant="outlined" />
            </FormControl>
            <FormControl  sx={{ m: 1, minWidth: 120 }}    className={'filter-item'} >
                <InputLabel  id="species-input">Species</InputLabel>
                <Select
                    onChange={(e)=>{
                        setSpeciesValue(e.target.value)

                    }}

                    labelId="species-input"
                    id="demo-simple-select"
                    label="Age"
                >
                    <MenuItem value={''}>All</MenuItem>
                    <MenuItem value={'human'}>Human</MenuItem>
                    <MenuItem value={'alien'}>Alien</MenuItem>
                    <MenuItem value={'humanoid'}>Humanoid</MenuItem>
                    <MenuItem value={'unknown'}>Unknown</MenuItem>
                    <MenuItem value={'robot'}>Robot</MenuItem>
                </Select>
            </FormControl>
            <FormControl  sx={{ m: 1, minWidth: 120 }}   className={'filter-item'}  >
                <InputLabel id="gender-input">Gender</InputLabel>
                <Select
                    onChange={(e)=>{
                        setGenderValue(e.target.value)

                    }}

                    labelId="species-input"
                    id="demo-simple-select"
                    labelId="gender-input"
                    id="demo-simple-select"
                >
                    <MenuItem value={''}>All</MenuItem>
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                    <MenuItem value={'genderless'}>Genderless </MenuItem>
                    <MenuItem value={'unknown'}>Unknown </MenuItem>
                </Select>
            </FormControl>
            <FormControl  sx={{ m: 1, minWidth: 120 }}    className={'filter-item'} >
                <InputLabel id="status-input">Status</InputLabel>
                <Select
                    labelId="status-input"
                    id="demo-simple-select"
                    onChange={(e)=>{
                        setStatusValue(e.target.value)

                    }}
                    label="Age"
                ><MenuItem value={''}>All</MenuItem>
                    <MenuItem value={'alive'}>Alive</MenuItem>
                    <MenuItem value={'dead'}>Dead</MenuItem>
                    <MenuItem value={'unknown'}>Unknown</MenuItem>
                </Select>
            </FormControl>

</div>


<div className={"char-list"}>

                    {charData.map(data => <div key={data.id} className={'char-item'}>
                        <div className={'img-form'}>
                            <img src={data.image} alt=""/>
                        </div>
                        <div className={'text-form'}>
                            <p className={'name-form'}>{data.name}</p>
                            <p className={'species-form'}> {data.species}</p>
                        </div>

                    </div>)}

</div>
            {loading ? <div className="text-center">loading data ...</div> : "" }
            {noData ? <div className="text-center">no data anymore ...</div> : "" }
        </div>
    );
}

export default MainContent;

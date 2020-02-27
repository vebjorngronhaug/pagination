import React, { useState, useEffect } from 'react';
import TableView from './components/TableView';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(20);

    useEffect(() => {
        const fetchRepositories = async () => {
            setLoading(true);
            const res = await axios.get('https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100');
            setRepositories(res.data.items);
            setLoading(false);
        };
        fetchRepositories();
    }, []);

    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = repositories.slice(indexOfFirstElement, indexOfLastElement);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    /* Sorting repositories alphabetically by name */
    function sortAlphabetically(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();

        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    repositories.sort(function(a, b) {
        return sortAlphabetically(a.name, b.name);
    })

    return (
        <div className="App">
            <div className="container">
                <h1> Popular JavaScript repositories </h1>
                <TableView 
                    repositories={currentElements} 
                    loading={loading} 
                />
                <Pagination
                    elementsPerPage={elementsPerPage}
                    totalElements={repositories.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default App;

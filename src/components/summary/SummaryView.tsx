"use client";

import React from "react";
import styled from "styled-components";

const SummaryContainer = styled.div`
table {
    border-collapse: separate;
    border-spacing: 0 1rem; /* No horizontal spacing, 10px vertical spacing */
}

th {
    color: grey;
}

tr {
    margin-top: 0.5rem;
}

td {
    padding: 0.1rem;
}

td:first-child {
    border: 1rem solid white;
    color: #1677ff;
    font-weight: 500;
    background-color: rgb(59 130 246 / 0.2);
    min-width: 150px;
    text-align: center;
}

td:nth-child(2) {
    color: lightgrey;
    padding-right: 0.5rem;
}

li {
    border: 1px solid lightgrey;
    border-radius: 1rem;
    padding: 1rem;
    margin-top: 1rem;
}

li > h4 {
    font-weight: 500;
}
` 

type SummaryViewProps = {
    title: string,
    text: string,
    description?: string,
    htmlView?: boolean,
}

const HighLevelSummary: React.FC<SummaryViewProps> = ({ title, text, description = '', htmlView = true }) => {

    return  (
        <SummaryContainer>
            <div className="px-20">
                <h1 className="text-2xl font-bold mb-4">{ title }</h1>
                <span className="text-lg mb-4">{ description }</span>
                {
                    htmlView ? <div dangerouslySetInnerHTML={{ __html: text }} className="text-lg"></div> : <span className="text-lg mb-4">{ text }</span> 
                }
            </div>
        </SummaryContainer>
    )
}

export default HighLevelSummary;
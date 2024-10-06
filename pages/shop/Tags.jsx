
// Importing React library
import React from 'react'

// Declaring the title of the widget
const title = "Our Popular Tags";

// Declaring an array of objects containing information about the popular tags
const tagList = [
    {
        // Link property of the object
        link: "#",
        // Text property of the object
        text: "Code Boss"
    },
    {
        link: "#",
        text: "Code Canyon"
    },
    {
        link: "#",
        text: "FullStack Developer"
    },
    {
        link: "#",
        text: "Frontend Boss"
    },
    {
        link: "#",
        text: "Website Dev"
    },
    {
        link: "#",
        text: "Scriptor"
    },
    {
        link: "#",
        text: "Encanto"
    },
    {
        link: "#",
        text: "Code of steel"
    },
    {
        link: "#",
        text: "E-commerce Designer"
    },
    {
        link: "#",
        text: "Dashboard Prince"
    },
]

// Declaring a functional component named Tags
const Tags = () => {
    return (
        // Returning JSX code for the Tags component
        <div className='widget widget-tags'>
            <div className="widget-header">
                {/* Displaying the title of the widget */}
                <h5 className='title'>{title}</h5>
            </div>
            <ul className="widget-wrapper">
                {/* Mapping over the tagList array and rendering JSX code for each tag */}
                {tagList.map((val, i) => {
                    return <li key={i}>
                        <a href={val.link}>{val.text}</a>
                    </li>
                })}
            </ul>
        </div>
    )
}

// Exporting the Tags component as the default export of this module
export default Tags


import React from 'react';

const Blog = () => {
    return (
        <div className='max-w-7xl mx-auto py-20'>
            <p className='text-xl font-bold'>What are the different ways to manage a state in a React application?</p>
            The Four Kinds of React State to Manage: <br />
            <ul className='list-disc ml-4'>
                <li>Local State.</li>
                <li>Global State.</li>
                <li>Server State.</li>
                <li>URL State.</li>
            </ul>
            <div className="divider"></div>
            <p className='text-xl font-bold'>How does prototypical inheritance work?</p>
            The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
            <div className="divider"></div>
            <p className='text-xl font-bold'>What is a unit test? Why should we write unit tests?</p>
            The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
            <div className="divider"></div>
            <p className='text-xl font-bold mb-2'>React vs. Angular vs. Vue?</p>
            <b>Angular vs React: </b><br />
            If the choice you’re making is based on Angular vs React alone, then you’ll simply need to consider the pros and cons discussed for those libraries in this post. But overall, keep in mind that both libraries can be used for mobile and web apps, while Angular is generally better for more complex apps that are enterprise-ready.
            <br />
            React often requires extra modules and components, which keeps the core library small, but means there’s extra work involved when incorporating outside tools. Angular, on the other hand, is more of a full-fledged solution that doesn’t require extras like React often does, though it does have a steeper learning curve for its core compared to React.
            <br />
            React is more suitable for intermediate to advanced JavaScript developers who are familiar with concepts from ES6 and up, while Angular favors those same developers who are also familiar with TypeScript.
            <br />
            <b>React vs Vue:</b>
            <br />
            The choice between React vs Vue is often debated and it’s not an easy one. Vue has a vibrant and ever-growing community and has taken over popularity vs. React in many respects. React developers are still churning out lots of new components and extras, so there’s no sign that React is on the decline either.
            <br />
            Vue is generally more suited to smaller, less complex apps and is easier to learn from scratch compared to React. Vue can be easier to integrate into new or existing projects and many feel its use of HTML templates along with JSX is an advantage.
            <br />
            Overall, Vue might be the best choice if you’re a newer developer and not as familiar with advanced JavaScript concepts, while React is quite well suited for experienced programmers and developers who have worked with object-oriented JavaScript, functional JavaScript, and similar concepts.
            <br />
            <b> Angular vs Vue:</b>
            <br />
            In most cases, you probably wouldn’t be deciding between only Angular and Vue. They are vastly different libraries with very different feature sets and learning curves. Vue is the clear choice for less experienced developers, and Angular would be preferred for those working on larger apps.
            <br />
            A large library like Angular would require more diligence in keeping up with what’s new, while Vue would be less demanding in this regard and the fact that the two most recent major releases of Vue are in separate repositories helps.
            <br />
            It should also be noted that Vue was created by a developer who formerly worked on Angular for Google, so that’s another thing to keep in mind, though that wouldn’t have a huge impact on your decision.
        </div>
    );
};

export default Blog;
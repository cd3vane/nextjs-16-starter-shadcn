import EventHubMessages from "../components/EventHubMessages";

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const Page = () => {
    return (<main>
        <h1>EventHub Demo</h1>
        <EventHubMessages />
    </main>)
};

export default Page;

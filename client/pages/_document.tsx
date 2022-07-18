import { Html, Main, NextScript,Head } from "next/document";
import { createGetInitialProps } from "@mantine/next";


export default function Document () {
    return (
        <Html lang="en">
            <Head/>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}

Document.getInitialProps = createGetInitialProps()

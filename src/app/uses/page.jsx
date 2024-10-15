import {Card} from '@/components/Card'
import {Section} from '@/components/Section'
import {SimpleLayout} from '@/components/SimpleLayout'

function ToolsSection({children, ...props}) {
    return (
        <Section {...props}>
            <ul role="list" className="space-y-16">
                {children}
            </ul>
        </Section>
    )
}

function Tool({title, href, children}) {
    return (
        <Card as="li">
            <Card.Title as="h3" href={href}>
                {title}
            </Card.Title>
            <Card.Description>{children}</Card.Description>
        </Card>
    )
}

export const metadata = {
    title: 'Uses',
    description: 'Tools I recommend & use for development.',
}

export default function Uses() {
    return (
        <SimpleLayout
            title="Tools I use for software development & data science."
            intro="As a software engineer & data science enthusiast, I’m often asked about the tools, technologies, and gadgets I use to build software, analyze data, and stay productive. Below is a curated list of hardware, software, and services that are essential to my workflow, helping me tackle everything from coding to complex data projects."
        >
            <div className="space-y-20">
                <ToolsSection title="Workstation">
                    <Tool title="Asus ROG Zephyrus G14">
                        This compact powerhouse is my go-to laptop for all things development and design. With its Ryzen
                        9 processor and 32GB of RAM, it handles everything I throw at it, whether coding, gaming, or
                        running simulations.
                    </Tool>
                    <Tool title="Logitech G213 Prodigy RGB">
                        Comfortable, durable, and tactile. This keyboard has been a game changer for both
                        typing and gaming sessions.
                    </Tool>
                    <Tool title="Logitech G502 Wireless">
                        The precision and customizable buttons make it perfect for coding work. It's a productivity
                        booster in every sense.
                    </Tool>
                </ToolsSection>

                <ToolsSection title="Development tools">
                    <Tool title="JetBrains IDE's">
                        My favorite IDE for development. The smart code completion and refactoring tools keep my
                        workflow smooth and efficient.
                        <div className={"flex gap-x-2 mt-1.5"}>
                            <img
                                src="https://resources.jetbrains.com/storage/products/company/brand/logos/PyCharm_icon.png"
                                alt="JetBrains WebStorm" width="30" height="30"/>
                            <img
                                src="https://resources.jetbrains.com/storage/products/company/brand/logos/DataSpell_icon.png"
                                alt="JetBrains WebStorm" width="30" height="30"/>
                            <img
                                src="https://resources.jetbrains.com/storage/products/company/brand/logos/PhpStorm_icon.png"
                                alt="JetBrains WebStorm" width="30" height="30"/>
                            <img
                                src="https://resources.jetbrains.com/storage/products/company/brand/logos/WebStorm_icon.png"
                                alt="JetBrains WebStorm" width="30" height="30"/>
                        </div>

                    </Tool>
                    <Tool title="TablePlus">
                        The best database management tool I've found. It supports multiple databases and provides a
                        simple yet powerful interface for running queries and managing data.
                    </Tool>
                </ToolsSection>

                <ToolsSection title="Design">
                    <Tool title="Figma">
                        Not just for design—Figma has become the collaboration hub for our team. From mockups to
                        brainstorming, it's essential to our workflow.
                        <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="Figma"
                             className={"mt-1.5"} width="25"/>
                    </Tool>
                </ToolsSection>

                <ToolsSection title="Productivity">
                    <Tool title="Notion">
                        An all-in-one workspace designed to enhance productivity and collaboration across various tasks.
                        I personally use it for content organization, notes.
                    </Tool>
                    <Tool title="Todoist">
                        Todoist keeps my notes organized using a daily journal system. It's a great way to track
                        thoughts, tasks, and ideas without worrying about categories or folders.
                    </Tool>
                    <Tool title="Notion Calender">
                        My preferred tool for scheduling meetings, ensuring my calendar stays balanced between work and
                        downtime.
                    </Tool>
                    <Tool title="Focus">
                        A simple but effective website blocker that helps me avoid distractions when I need to get into
                        deep work mode.
                    </Tool>
                </ToolsSection>
            </div>

        </SimpleLayout>
    )
}

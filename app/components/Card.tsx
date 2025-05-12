

export default function Card({
    headerTitle, children
   }: CardProps){

    return (
        <article className="card">
            <h3 className="text-base font-medium">
                {headerTitle}
            </h3>

            <div className="content">
                {children}
            </div>
        </article>
    )
}



export default function TableCard({
    headerTitle, children
   }: CardProps){

    return (
        <article className="table-card">
            <h3 className="text-base font-medium p-6">
                {headerTitle}
            </h3>

            <div className="content">
                {children}
            </div>
        </article>
    )
}

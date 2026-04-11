
const STATS = [
  { num: '50K+',  label: 'Happy Customers' },
  { num: '2,000+', label: 'Products' },
  { num: '4.9★',  label: 'Avg Rating' },
  { num: '7-Day', label: 'Easy Returns' },
]

const Stats = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
            {STATS.map((s, i) => (
                <div
                    key={i}
                    className="stat-card a-stat"
                    style={{ animationDelay: `${i * 0.08}s` }}
                >
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>{s.num}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{s.label}</p>
                </div>
            ))}
        </div>
    )
}

export default Stats

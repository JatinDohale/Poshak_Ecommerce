import POLICIES from '../../data/policies'



const OurPolicy = () => {
  return (
    <section className="py-10">

      {/* Section label */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Why choose us</p>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gray-200" />
          <p className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
            Our Promise to You
          </p>
          <div className="h-px w-10 bg-gray-200" />
        </div>
      </div>

      {/* Policy cards */}
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-stretch px-2">
        {POLICIES.map((policy, i) => (
          <div
            key={i}
            className="op-card flex-1 max-w-xs mx-auto sm:mx-0 flex flex-col items-center text-center
              bg-white rounded-2xl border border-gray-100 px-7 py-8"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Icon */}
            <div
              className="op-icon-wrap w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: policy.bg }}
            >
              <img src={policy.icon} alt={policy.title} className="w-8 h-8 object-contain" />
            </div>

            {/* Badge */}
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ background: policy.bg, color: policy.color }}
            >
              {policy.badge}
            </span>

            {/* Text */}
            <p className="text-sm font-semibold text-gray-800 mb-1.5">{policy.title}</p>
            <p className="text-xs text-gray-400 leading-relaxed">{policy.desc}</p>

            {/* Bottom accent line */}
            <div
              className="w-8 h-0.5 rounded-full mt-5"
              style={{ background: policy.color, opacity: 0.4 }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
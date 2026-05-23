import { motion } from 'framer-motion'

interface PalmProps {
  seed?: number
}

/* ─── DEF DEFINITIONS FOR SHADOW & GRADIENTS ─── */
const SVGDefs = ({ prefix }: { prefix: string }) => (
  <defs>
    <linearGradient id={`${prefix}-trunkGrad`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#4E2F1E" />
      <stop offset="45%" stopColor="#8B5A2B" />
      <stop offset="100%" stopColor="#3E2410" />
    </linearGradient>
    <linearGradient id={`${prefix}-frondGrad`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4CAF50" />
      <stop offset="50%" stopColor="#2E7D32" />
      <stop offset="100%" stopColor="#1B5E20" />
    </linearGradient>
    <linearGradient id={`${prefix}-frondGrad2`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#66BB6A" />
      <stop offset="100%" stopColor="#2E7D32" />
    </linearGradient>
    <radialGradient id={`${prefix}-dateGrad`} cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#D2691E" />
      <stop offset="100%" stopColor="#5C2E0A" />
    </radialGradient>
    <filter id={`${prefix}-softShadow`} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
      <feOffset dx="2" dy="3" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.4" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
)

/* ─── MATURE DATE PALM COMPONENT ─── */
function MaturePalm() {
  const prefix = 'mature'
  const defsUrl = (id: string) => `url(#${prefix}-${id})`

  return (
    <motion.svg
      width="160"
      height="240"
      viewBox="0 0 380 570"
      fill="none"
      animate={{ rotate: [-0.8, 0.8, -0.8] }}
      transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      style={{ transformOrigin: '180px 570px', overflow: 'visible' }}
    >
      <SVGDefs prefix={prefix} />

      {/* Main curved trunk */}
      <g filter={defsUrl('softShadow')}>
        <path
          d="M180,570 Q165,470 173,380 Q180,310 190,240 Q197,190 193,150"
          stroke={defsUrl('trunkGrad')}
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M173,555 Q163,460 171,370 Q177,300 185,235 Q191,185 189,150"
          stroke="#3E2410"
          strokeWidth="4"
          fill="none"
          opacity="0.5"
          strokeLinecap="round"
        />
      </g>

      {/* Trunk texture rings */}
      <g stroke="#3E2410" strokeWidth="1.5" fill="none" opacity="0.85">
        <path d="M168,550 Q183,543 198,550" />
        <path d="M168,530 Q183,523 198,530" />
        <path d="M169,510 Q183,503 197,510" />
        <path d="M169,490 Q183,483 197,490" />
        <path d="M170,470 Q183,463 196,470" />
        <path d="M170,450 Q183,443 196,450" />
        <path d="M171,430 Q184,423 197,430" />
        <path d="M172,410 Q184,403 197,410" />
        <path d="M173,390 Q185,383 197,390" />
        <path d="M174,370 Q186,363 198,370" />
        <path d="M175,350 Q187,343 199,350" />
        <path d="M176,330 Q188,323 200,330" />
        <path d="M178,310 Q189,303 201,310" />
        <path d="M179,290 Q190,283 202,290" />
        <path d="M181,270 Q191,263 203,270" />
        <path d="M182,250 Q192,243 204,250" />
        <path d="M183,230 Q193,223 205,230" />
        <path d="M184,210 Q194,203 206,210" />
        <path d="M185,190 Q194,183 206,190" />
        <path d="M186,170 Q195,163 206,170" />
      </g>

      {/* Crown base */}
      <ellipse cx="193" cy="145" rx="18" ry="12" fill="#4E7A2E" />
      <ellipse cx="193" cy="140" rx="12" ry="8" fill="#6B9B3A" />

      {/* Date clusters */}
      <g>
        <path d="M197,150 Q210,170 215,195" stroke="#5C3317" strokeWidth="2" fill="none" />
        <path d="M197,150 Q205,175 207,200" stroke="#5C3317" strokeWidth="2" fill="none" />
        <path d="M215,195 L220,210" stroke="#5C3317" strokeWidth="1.2" fill="none" />
        <path d="M215,195 L210,212" stroke="#5C3317" strokeWidth="1.2" fill="none" />
        <path d="M207,200 L205,218" stroke="#5C3317" strokeWidth="1.2" fill="none" />
        <ellipse cx="220" cy="215" rx="4" ry="6" fill={defsUrl('dateGrad')} />
        <ellipse cx="210" cy="218" rx="4" ry="6" fill={defsUrl('dateGrad')} />
        <ellipse cx="205" cy="224" rx="4" ry="6" fill={defsUrl('dateGrad')} />
        <ellipse cx="219" cy="213" rx="1.2" ry="2" fill="#F4A460" opacity="0.6" />
        <ellipse cx="209" cy="216" rx="1.2" ry="2" fill="#F4A460" opacity="0.6" />
      </g>
      <g>
        <path d="M189,150 Q175,172 170,198" stroke="#5C3317" strokeWidth="2" fill="none" />
        <path d="M189,150 Q180,175 178,202" stroke="#5C3317" strokeWidth="2" fill="none" />
        <path d="M170,198 L165,215" stroke="#5C3317" strokeWidth="1.2" fill="none" />
        <path d="M170,198 L175,216" stroke="#5C3317" strokeWidth="1.2" fill="none" />
        <path d="M178,202 L177,220" stroke="#5C3317" strokeWidth="1.2" fill="none" />
        <ellipse cx="165" cy="220" rx="4" ry="6" fill={defsUrl('dateGrad')} />
        <ellipse cx="175" cy="222" rx="4" ry="6" fill={defsUrl('dateGrad')} />
        <ellipse cx="177" cy="226" rx="4" ry="6" fill={defsUrl('dateGrad')} />
        <ellipse cx="164" cy="218" rx="1.2" ry="2" fill="#F4A460" opacity="0.6" />
        <ellipse cx="174" cy="220" rx="1.2" ry="2" fill="#F4A460" opacity="0.6" />
      </g>

      {/* Fronds */}
      {[
        // Frond 1: Right Upward
        {
          path: 'M193,145 Q255,90 335,50',
          fillPath: 'M193,145 Q265,80 335,50 Q285,100 193,145',
          grad: 'frondGrad',
          lines: [
            ['215,128', '240,105'],
            ['230,118', '257,93'],
            ['245,108', '275,83'],
            ['260,98', '292,75'],
            ['275,90', '308,68'],
            ['290,82', '323,62'],
            ['305,74', '333,58'],
            ['215,132', '233,145'],
            ['230,123', '250,135'],
            ['245,115', '267,125'],
            ['260,107', '283,115'],
            ['275,99', '300,107'],
            ['290,92', '315,98'],
          ],
          color: '#2E7D32',
          opacity: 0.95,
        },
        // Frond 2: Right Horizontal
        {
          path: 'M193,145 Q280,125 370,120',
          fillPath: 'M193,145 Q285,110 370,120 Q285,138 193,145',
          grad: 'frondGrad2',
          lines: [
            ['225,138', '245,115'],
            ['250,132', '273,108'],
            ['275,128', '300,103'],
            ['300,124', '325,100'],
            ['325,121', '347,102'],
            ['225,144', '240,162'],
            ['250,142', '267,158'],
            ['275,140', '295,155'],
            ['300,137', '320,150'],
            ['325,134', '343,146'],
          ],
          color: '#388E3C',
          opacity: 0.92,
        },
        // Frond 3: Right Drooping
        {
          path: 'M193,148 Q280,185 345,270',
          fillPath: 'M193,148 Q290,165 345,270 Q275,198 193,148',
          grad: 'frondGrad',
          lines: [
            ['225,162', '240,145'],
            ['250,175', '267,158'],
            ['275,190', '293,172'],
            ['295,208', '315,190'],
            ['313,228', '333,210'],
            ['225,168', '235,190'],
            ['250,183', '262,208'],
            ['275,202', '287,228'],
            ['295,222', '308,248'],
            ['313,243', '325,268'],
          ],
          color: '#2E7D32',
          opacity: 0.88,
        },
        // Frond 4: Left Upward
        {
          path: 'M193,145 Q115,90 35,50',
          fillPath: 'M193,145 Q105,80 35,50 Q120,100 193,145',
          grad: 'frondGrad',
          lines: [
            ['170,128', '145,105'],
            ['155,118', '127,93'],
            ['140,108', '110,83'],
            ['125,98', '93,75'],
            ['110,90', '77,68'],
            ['95,82', '62,62'],
            ['80,74', '52,58'],
            ['170,132', '152,145'],
            ['155,123', '135,135'],
            ['140,115', '118,125'],
            ['125,107', '102,115'],
            ['110,99', '85,107'],
            ['95,92', '70,98'],
          ],
          color: '#2E7D32',
          opacity: 0.95,
        },
        // Frond 5: Left Horizontal
        {
          path: 'M193,145 Q100,125 10,120',
          fillPath: 'M193,145 Q95,110 10,120 Q100,138 193,145',
          grad: 'frondGrad2',
          lines: [
            ['160,138', '140,115'],
            ['135,132', '112,108'],
            ['110,128', '85,103'],
            ['85,124', '60,100'],
            ['60,121', '38,102'],
            ['160,144', '145,162'],
            ['135,142', '118,158'],
            ['110,140', '90,155'],
            ['85,137', '65,150'],
            ['60,134', '42,146'],
          ],
          color: '#388E3C',
          opacity: 0.92,
        },
        // Frond 6: Left Drooping
        {
          path: 'M193,148 Q100,185 35,270',
          fillPath: 'M193,148 Q90,165 35,270 Q105,198 193,148',
          grad: 'frondGrad',
          lines: [
            ['160,162', '145,145'],
            ['135,175', '118,158'],
            ['110,190', '92,172'],
            ['90,208', '70,190'],
            ['72,228', '52,210'],
            ['160,168', '150,190'],
            ['135,183', '123,208'],
            ['110,202', '98,228'],
            ['90,222', '77,248'],
            ['72,243', '60,268'],
          ],
          color: '#2E7D32',
          opacity: 0.88,
        },
        // Frond 7: Top Center
        {
          path: 'M193,145 Q190,70 185,0',
          fillPath: 'M193,145 Q175,65 185,0 Q207,70 193,145',
          grad: null,
          solidFill: '#43A047',
          lines: [
            ['187,120', '165,105'],
            ['185,100', '163,82'],
            ['184,80', '163,60'],
            ['184,60', '165,40'],
            ['185,40', '168,20'],
            ['186,20', '173,5'],
            ['199,120', '220,105'],
            ['201,100', '222,82'],
            ['202,80', '222,60'],
            ['202,60', '220,40'],
            ['201,40', '217,20'],
            ['200,20', '212,5'],
          ],
          color: '#2E7D32',
          opacity: 0.95,
        },
        // Frond 8: Top Right
        {
          path: 'M193,145 Q235,70 275,0',
          fillPath: 'M193,145 Q245,60 275,0 Q225,75 193,145',
          grad: 'frondGrad2',
          lines: [
            ['205,120', '190,98'],
            ['215,100', '203,75'],
            ['225,80', '215,55'],
            ['235,62', '227,35'],
            ['245,45', '240,20'],
            ['210,125', '233,115'],
            ['223,105', '247,92'],
            ['233,88', '258,72'],
            ['243,70', '267,52'],
            ['253,50', '273,32'],
          ],
          color: '#388E3C',
          opacity: 0.9,
        },
        // Frond 9: Top Left
        {
          path: 'M193,145 Q145,70 105,0',
          fillPath: 'M193,145 Q135,60 105,0 Q155,75 193,145',
          grad: 'frondGrad2',
          lines: [
            ['180,120', '195,98'],
            ['170,100', '182,75'],
            ['160,80', '170,55'],
            ['150,62', '158,35'],
            ['140,45', '145,20'],
            ['175,125', '152,115'],
            ['162,105', '138,92'],
            ['152,88', '127,72'],
            ['142,70', '118,52'],
            ['132,50', '112,32'],
          ],
          color: '#388E3C',
          opacity: 0.9,
        },
      ].map((frond, idx) => (
        <g key={idx}>
          <path d={frond.path} stroke="#1B5E20" strokeWidth="3.5" fill="none" />
          <path
            d={frond.fillPath}
            fill={frond.grad ? defsUrl(frond.grad) : frond.solidFill}
            opacity={frond.opacity}
          />
          <g stroke={frond.color} strokeWidth="1.3" fill="none" opacity="0.9">
            {frond.lines.map(([p1, p2], lineIdx) => (
              <path key={lineIdx} d={`M${p1} L${p2}`} />
            ))}
          </g>
        </g>
      ))}

      {/* Back fronds */}
      <g opacity="0.75">
        <path d="M193,142 Q245,105 295,85" stroke="#1B5E20" strokeWidth="2.5" fill="none" />
        <path d="M193,142 Q250,95 295,85 Q250,115 193,142" fill="#2E7D32" />
        <path d="M193,142 Q135,105 85,85" stroke="#1B5E20" strokeWidth="2.5" fill="none" />
        <path d="M193,142 Q130,95 85,85 Q135,115 193,142" fill="#2E7D32" />
      </g>
    </motion.svg>
  )
}

/* ─── WIND-SWEPT PALM COMPONENT ─── */
function WindSweptPalm() {
  const prefix = 'windswept'
  const defsUrl = (id: string) => `url(#${prefix}-${id})`

  return (
    <motion.svg
      width="200"
      height="220"
      viewBox="0 0 460 510"
      fill="none"
      animate={{ rotate: [-1.2, 1.2, -1.2] }}
      transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      style={{ transformOrigin: '230px 505px', overflow: 'visible' }}
    >
      <SVGDefs prefix={prefix} />

      {/* Heavily curved trunk leaning right */}
      <g filter={defsUrl('softShadow')}>
        <path
          d="M230,505 Q260,420 290,340 Q315,270 335,210 Q350,160 340,120"
          stroke={defsUrl('trunkGrad')}
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M235,490 Q265,410 295,330 Q318,265 338,205 Q352,158 343,120"
          stroke="#3E2410"
          strokeWidth="3.5"
          fill="none"
          opacity="0.5"
          strokeLinecap="round"
        />
      </g>

      {/* Trunk rings for wind-swept palm */}
      <g stroke="#3E2410" strokeWidth="1.3" fill="none" opacity="0.8">
        <path d="M225,485 Q240,478 255,485" />
        <path d="M230,465 Q245,458 260,465" />
        <path d="M235,445 Q250,438 265,445" />
        <path d="M240,425 Q255,418 270,425" />
        <path d="M245,405 Q260,398 275,405" />
        <path d="M250,385 Q265,378 280,385" />
        <path d="M258,365 Q272,358 287,365" />
        <path d="M265,345 Q279,338 294,345" />
        <path d="M275,325 Q288,318 302,325" />
        <path d="M285,305 Q298,298 312,305" />
        <path d="M295,285 Q307,278 320,285" />
        <path d="M305,265 Q317,258 330,265" />
        <path d="M315,245 Q326,238 338,245" />
        <path d="M325,225 Q335,218 346,225" />
        <path d="M332,205 Q341,198 351,205" />
        <path d="M338,185 Q346,178 355,185" />
        <path d="M342,165 Q349,158 357,165" />
        <path d="M345,145 Q351,138 358,145" />
      </g>

      {/* Crown base */}
      <ellipse cx="340" cy="115" rx="16" ry="10" fill="#4E7A2E" />

      {/* Small date cluster */}
      <g>
        <path d="M343,120 Q352,135 355,150" stroke="#5C3317" strokeWidth="1.8" fill="none" />
        <path d="M355,150 L358,162" stroke="#5C3317" strokeWidth="1" fill="none" />
        <path d="M355,150 L352,163" stroke="#5C3317" strokeWidth="1" fill="none" />
        <ellipse cx="358" cy="166" rx="3.5" ry="5" fill={defsUrl('dateGrad')} />
        <ellipse cx="352" cy="168" rx="3.5" ry="5" fill={defsUrl('dateGrad')} />
        <ellipse cx="357" cy="164" rx="1" ry="1.8" fill="#F4A460" opacity="0.6" />
      </g>

      {/* WIND-SWEPT FRONDS */}
      {[
        // Frond 1: Strong right
        {
          path: 'M340,115 Q400,80 460,60',
          fillPath: 'M340,115 Q410,65 460,60 Q415,90 340,115',
          grad: 'frondGrad',
          lines: [
            ['365,102', '385,85'],
            ['390,92', '412,75'],
            ['415,82', '438,68'],
            ['440,75', '458,65'],
            ['365,108', '380,122'],
            ['390,102', '408,115'],
            ['415,95', '435,105'],
          ],
          color: '#2E7D32',
          opacity: 0.92,
        },
        // Frond 2: Far right drooping
        {
          path: 'M340,118 Q400,150 450,220',
          fillPath: 'M340,118 Q410,135 450,220 Q395,160 340,118',
          grad: 'frondGrad',
          lines: [
            ['370,132', '385,120'],
            ['395,148', '412,135'],
            ['420,168', '438,155'],
            ['370,138', '380,158'],
            ['395,158', '407,178'],
            ['420,180', '432,200'],
          ],
          color: '#2E7D32',
          opacity: 0.85,
        },
        // Frond 3: Slight left (fighting wind)
        {
          path: 'M340,115 Q300,90 260,80',
          fillPath: 'M340,115 Q295,75 260,80 Q305,100 340,115',
          grad: 'frondGrad2',
          lines: [
            ['320,105', '305,90'],
            ['300,98', '285,85'],
            ['280,92', '268,82'],
            ['320,112', '308,125'],
            ['300,108', '288,120'],
          ],
          color: '#388E3C',
          opacity: 0.88,
        },
        // Frond 4: Up-right
        {
          path: 'M340,115 Q370,50 390,0',
          fillPath: 'M340,115 Q380,40 390,0 Q365,55 340,115',
          grad: 'frondGrad2',
          lines: [
            ['350,90', '338,72'],
            ['360,65', '350,45'],
            ['370,40', '362,20'],
            ['355,98', '372,90'],
            ['368,75', '385,65'],
            ['378,50', '392,38'],
          ],
          color: '#388E3C',
          opacity: 0.85,
        },
        // Frond 5: Right horizontal low
        {
          path: 'M340,118 Q390,125 440,140',
          fillPath: 'M340,118 Q395,112 440,140 Q390,132 340,118',
          grad: null,
          solidFill: '#388E3C',
          lines: [
            ['365,120', '380,108'],
            ['390,122', '408,112'],
            ['415,128', '432,120'],
            ['365,128', '378,142'],
            ['390,132', '405,145'],
          ],
          color: '#2E7D32',
          opacity: 0.88,
        },
      ].map((frond, idx) => (
        <g key={idx}>
          <path d={frond.path} stroke="#1B5E20" strokeWidth="3" fill="none" />
          <path
            d={frond.fillPath}
            fill={frond.grad ? defsUrl(frond.grad) : frond.solidFill}
            opacity={frond.opacity}
          />
          <g stroke={frond.color} strokeWidth="1.2" fill="none" opacity="0.85">
            {frond.lines.map(([p1, p2], lineIdx) => (
              <path key={lineIdx} d={`M${p1} L${p2}`} />
            ))}
          </g>
        </g>
      ))}

      {/* Back frond */}
      <g opacity="0.7">
        <path d="M340,112 Q380,85 420,75" stroke="#1B5E20" strokeWidth="2.5" fill="none" />
        <path d="M340,112 Q385,75 420,75 Q385,95 340,112" fill="#2E7D32" />
      </g>
    </motion.svg>
  )
}

export function Palm({ seed = 0 }: PalmProps) {
  // Determine variant based on seed to ensure stable persistence
  const isWindSwept = seed % 2 === 1

  return isWindSwept ? <WindSweptPalm /> : <MaturePalm />
}

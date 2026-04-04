import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedDarkAtom, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  InformationCircleIcon, 
  Idea01Icon, 
  AlertCircleIcon, 
  Copy01Icon, 
  Checkmark
} from '@hugeicons/core-free-icons';

/* ── Context for sync ── */
export const LanguageContext = React.createContext({
  preferredLanguage: 'CURL',
  setPreferredLanguage: () => {},
  theme: 'light',
});

/* ── Reusable UI components ── */
export const CodeBlock = ({ title, children, noHeader }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useContext(LanguageContext);

  const detectLang = (code) => {
    const s = (code || '').trim();
    if (s.startsWith('{') || s.startsWith('[')) return 'json';
    if (/\b(import requests|import os|requests\.get|print\(f"|def\s+\w+\(|if\s+__name__)\b/.test(s)) return 'python';
    if (/\b(const|let|var|await|async|function|import|export|=>)\b/.test(s)) return 'javascript';
    return 'bash';
  };

  const lang = detectLang(children);

  const copy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className={`docs-code-block ${noHeader ? 'no-header' : ''}`}>
      {!noHeader && (
        <div className="code-block-header">
          <span className="code-block-title">{title || lang}</span>
           
          <button className="code-copy-btn" onClick={copy} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <HugeiconsIcon 
            icon={copied? Checkmark : Copy01Icon} 
            size={16}  
          />
          <span style={{ fontSize: '0.85rem' }}>{copied ? 'Copied' : 'Copy'}</span>
        </button>
        </div>
      )}
      <SyntaxHighlighter
        language={lang}
        style={theme === 'dark' ? solarizedDarkAtom : solarizedlight}
        showLineNumbers={true}
        customStyle={{
          margin: 0,
          padding: '16px 20px',
          fontSize: '0.855rem',
          lineHeight: '1.65',
          borderRadius: 0,
          overflowX: 'auto',
          background: 'transparent',
        }}
        codeTagProps={{ style: { fontFamily: "'JetBrains Mono', monospace" } }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
CodeBlock.isCodeBlock = true;

export const CodeGroup = ({ children }) => {
  const { preferredLanguage, setPreferredLanguage } = useContext(LanguageContext);
  const [activeIdx, setActiveIdx] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const blocks = useMemo(() => 
    React.Children.toArray(children).filter(child => 
      child.type && (child.type === CodeBlock || child.type.isCodeBlock)
    ),
    [children]
  );

  useEffect(() => {
    if (!blocks.length) return;
    const idx = blocks.findIndex(b =>
      b.props.title?.toLowerCase() === preferredLanguage?.toLowerCase()
    );
    if (idx !== -1) setActiveIdx(idx);
  }, [preferredLanguage, blocks]);

  if (blocks.length === 0) return null;

  const handleTabClick = (idx, title) => {
    setActiveIdx(idx);
    if (title) setPreferredLanguage(title);
  };

  const copy = () => {
    const activeBlock = blocks[activeIdx];
    navigator.clipboard.writeText(activeBlock.props.children).then(() => {
      setCopiedIdx(activeIdx);
      setTimeout(() => setCopiedIdx(null), 1800);
    });
  };

  return (
    <div className="docs-code-group">
      <div className="code-group-header">
        <div className="code-group-tabs">
          {blocks.map((block, i) => (
            <button
              key={i}
              className={`code-group-tab ${activeIdx === i ? 'active' : ''}`}
              onClick={() => handleTabClick(i, block.props.title)}
            >
              {block.props.title || 'Code'}
            </button>
          ))}
        </div>
        <button className="code-copy-btn" onClick={copy} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <HugeiconsIcon 
            icon={copiedIdx === activeIdx ? Checkmark : Copy01Icon} 
            size={16} 
            color={copiedIdx === activeIdx ? '#10b981' : 'currentColor'} 
          />
          <span style={{ fontSize: '0.85rem' }}>{copiedIdx === activeIdx ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="code-group-content">
        {blocks.map((block, i) => (
          <div key={i} style={{ display: activeIdx === i ? 'block' : 'none' }}>
            {React.cloneElement(block, { noHeader: true })}
          </div>
        ))}
      </div>
    </div>
  );
};

export const EndpointBadge = ({ method = 'GET', path }) => (
  <div className="endpoint-badge">
    <span className={`method method-${method.toLowerCase()}`}>{method}</span>
    <code className="endpoint-path">{path}</code>
  </div>
);

export const ParamTable = ({ params = [], headers }) => {
  const hasExample = params.some((p) => p.example);
  const computedHeaders = headers ?? [
    'Parameter',
    'Description',
    ...(hasExample ? ['Example'] : []),
  ];

  return (
    <div className="param-table-wrap">
      <table className="param-table">
        <thead><tr>{computedHeaders.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {params.map((p, i) => (
            <tr key={i}>
              <td><code>{p.name}</code>{p.required && <span className="required-star">*</span>}</td>
              <td>{p.desc}</td>
              
              {p.example && <td><code>{p.example}</code></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Callout = ({ type = 'note', children }) => {
  const icon = type === 'note' ? InformationCircleIcon : type === 'tip' ? Idea01Icon : AlertCircleIcon;
  const color = type === 'note' ? '#3b82f6' : type === 'tip' ? '#eab308' : '#ef4444';
  
  return (
    <div className={`docs-callout callout-${type}`}>
      <span className="callout-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <HugeiconsIcon icon={icon} size={20} color={color} />
      </span>
      <div className="callout-body">{children}</div>
    </div>
  );
};

export const ResponseField = ({ name, type, required, children }) => (
  <div className="response-field">
    <div className="rf-header">
      <code className="rf-name">{name}</code>
      <span className="rf-type">{type}</span>
      {required && <span className="rf-required">required</span>}
    </div>
    {children && <div className="rf-desc">{children}</div>}
  </div>
);

export const Steps = ({ children }) => <div className="steps-list">{children}</div>;
export const Step = ({ n, title, id, children }) => (
  <div className="step-item" id={id}>
    <div className="step-num">{n}</div>
    <div className="step-body">
      <strong>{title}</strong>
      {children && <div className="step-content">{children}</div>}
    </div>
  </div>
);

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { credentials, type Credential } from '../../data/credentials';
import Card3D from '../ui/Card3D';
import { X, ExternalLink, Award, Building2, FileCheck } from 'lucide-react';

function CredentialCard({ cred, onClick }: { cred: Credential; onClick: () => void }) {
  return (
    <Card3D>
      <motion.div
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-terminal cursor-pointer group h-full"
      >
        <div className="neu-terminal-titlebar">
          <div className="neu-terminal-dot neu-terminal-dot--close" />
          <div className="neu-terminal-dot neu-terminal-dot--minimize" />
          <div className="neu-terminal-dot neu-terminal-dot--maximize" />
          <span className="ml-3 text-xs text-neutral-500 font-mono truncate">
            ~/{cred.id}.cert
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="neu-badge p-2">
              {cred.type === 'registration' ? (
                <Building2 size={18} className="text-green-400" />
              ) : (
                <Award size={18} className="text-purple-400" />
              )}
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm text-white">
                {cred.title}
              </h3>
              <p className="text-neutral-500 text-xs">{cred.issuer}</p>
            </div>
          </div>

          {cred.regNo && (
            <div className="font-mono text-xs text-green-400 mb-2">
              Reg No. {cred.regNo}
            </div>
          )}

          <p className="text-neutral-400 text-xs mb-3 line-clamp-2">
            {cred.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-neutral-600 text-xs font-mono">{cred.date}</span>
            <div className="font-mono text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
              <span className="text-green-400">$</span> view cert <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Card3D>
  );
}

function CredentialDetail({ cred, onClose }: { cred: Credential; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="neu-terminal max-w-2xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="neu-terminal-titlebar">
          <div className="neu-terminal-dot neu-terminal-dot--close" />
          <div className="neu-terminal-dot neu-terminal-dot--minimize" />
          <div className="neu-terminal-dot neu-terminal-dot--maximize" />
          <span className="ml-3 text-xs text-neutral-500 font-mono truncate">
            cat ~/{cred.id}.cert
          </span>
          <button
            onClick={onClose}
            className="ml-auto text-neutral-400 hover:text-white transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="neu-badge p-3">
              {cred.type === 'registration' ? (
                <Building2 size={24} className="text-green-400" />
              ) : (
                <Award size={24} className="text-purple-400" />
              )}
            </div>
            <div>
              <h3 className="font-mono font-bold text-lg text-white">
                {cred.title}
              </h3>
              <p className="text-neutral-400 text-sm">{cred.issuer}</p>
            </div>
          </div>

          {/* Details */}
          <div className="neu-panel-inset p-4 mb-4">
            <div className="space-y-2 font-mono text-sm">
              {cred.regNo && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Registration No.</span>
                  <span className="text-green-400">{cred.regNo}</span>
                </div>
              )}
              {cred.taxId && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Tax ID (TIN)</span>
                  <span className="text-neutral-300">{cred.taxId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-500">Issued</span>
                <span className="text-neutral-300">{cred.date}</span>
              </div>
            </div>
          </div>

          <p className="text-neutral-300 text-sm leading-relaxed mb-5">
            {cred.description}
          </p>

          {/* Certificate preview */}
          <div className="neu-panel-inset p-3 mb-5">
            <iframe
              src={cred.certFile}
              className="w-full h-[300px] rounded-lg"
              title={cred.title}
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={cred.certFile}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-badge hover:text-white transition-colors gap-1.5 text-sm"
            >
              <FileCheck size={14} /> View Full Certificate
            </a>
            {cred.verifyUrl && (
              <a
                href={cred.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-badge hover:text-green-400 transition-colors gap-1.5 text-sm"
              >
                <ExternalLink size={14} /> {cred.verifyLabel}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Credentials() {
  const [selected, setSelected] = useState<Credential | null>(null);

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-sm text-neutral-500 mb-4">
          <span className="text-green-400">$</span> ls ~/credentials/
        </div>
        <h2 className="font-mono font-bold text-2xl tracking-wider uppercase text-white mb-2">
          Credentials
        </h2>
        <p className="text-neutral-400 text-sm">
          Certifications & business registrations. Click to verify.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {credentials.map((cred) => (
          <CredentialCard
            key={cred.id}
            cred={cred}
            onClick={() => setSelected(cred)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <CredentialDetail
            cred={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

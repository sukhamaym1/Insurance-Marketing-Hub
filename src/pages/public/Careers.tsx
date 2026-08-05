import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Briefcase, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { MOCK_JOBS } from '../../data/mockData';
import { useTemplateContext } from '../../context/TemplateContext';

export const Careers: React.FC = () => {
  const { addToast } = useTemplateContext();
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [applied, setApplied] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <Breadcrumbs />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Join Our <span className="text-gradient">Core Team</span>
        </h1>
        <p className="text-sm text-slate-300">
          Help us empower millions of insurance advisors worldwide with world-class marketing automation technology.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        <h3 className="text-lg font-bold text-white mb-4">Open Positions</h3>
        {MOCK_JOBS.map((job) => (
          <div
            key={job.id}
            className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold">
                {job.department}
              </span>
              <h4 className="text-base font-bold text-white">{job.title}</h4>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> {job.type}
                </span>
              </div>
              <p className="text-xs text-slate-300 pt-1">{job.description}</p>
            </div>

            <button
              onClick={() => {
                setSelectedJob(job);
                setApplied(false);
              }}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow transition shrink-0"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0B1220] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6">
            <h3 className="text-lg font-bold text-white">Apply for {selectedJob.title}</h3>

            {applied ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Application Received!</h4>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setApplied(true);
                  addToast('Job Application submitted successfully!', 'success');
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Full Name</label>
                  <input required type="text" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Email</label>
                  <input required type="email" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">LinkedIn / Portfolio URL</label>
                  <input required type="text" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold shadow-glow"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

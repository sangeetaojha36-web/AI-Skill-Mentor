import React, { useState, useEffect } from 'react';
import { User, Course } from '../types.ts';
import { api } from '../services/api.ts';
import { BookOpen, Search, ExternalLink, Star, Award, Filter } from 'lucide-react';

interface CoursesViewProps {
  user: User;
  onNavigate: (tab: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ user, onNavigate }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await api.getCourses();
      setCourses(data.courses);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = courses.filter((c) => {
    const matchesDiff = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'All' || c.type === selectedType;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1">
          <span>Curated Learning Directory</span>
          <span aria-hidden="true">·</span>
          <span>Missing Skill Mapped</span>
          <span aria-hidden="true">·</span>
          <span>Verified Providers</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Course & Certification Recommendations
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          High-yield educational resources directly matched to missing competencies in your target career path.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill (e.g. SQL, ROS, Revit, Python)..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">All Resource Types</option>
            <option value="Course">Courses</option>
            <option value="Certification">Certifications</option>
            <option value="Interactive">Interactive Labs</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs">Loading course catalog...</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-12 text-center text-xs text-slate-400">
          No courses found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
                    {course.type}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">{course.title}</h3>

                <div className="text-xs text-slate-400">
                  Provider: <span className="text-slate-200">{course.provider}</span>
                </div>

                <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Skill: {course.skill}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono">
                    {course.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono">
                    {course.duration}
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 truncate max-w-[140px]">
                  {course.domain.split(' ')[0]}
                </span>
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  <span>Start Course</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

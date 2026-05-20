'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Heart, Code2, Shield, Smartphone } from 'lucide-react';
import { projectsService } from '@/services/projectsService';
import { Project, ProjectsState } from '@/types';

const ProjectsSection: React.FC = () => {
  const [state, setState] = useState<ProjectsState>(projectsService.initializeState());

  useEffect(() => {
    const loadProjects = async () => {
      setState(projectsService.setLoading([], true));
      try {
        const projects = await projectsService.getProjects();
        setState(projectsService.setSuccess(projects));
      } catch (error) {
        setState(projectsService.setError(error instanceof Error ? error.message : 'Erreur de chargement'));
      }
    };

    loadProjects();
  }, []);

  const getCategoryIcon = (projectType: string) => {
    switch (projectType) {
      case 'MOBILE':
        return <Smartphone className="w-4 h-4" />;
      case 'FULLSTACK':
        return <Code2 className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (projectType: string) => {
    switch (projectType) {
      case 'MOBILE':
        return 'Application Mobile';
      case 'FULLSTACK':
        return 'Application Fullstack';
      default:
        return projectType;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#FFFFFF] via-[#F0F9FF] to-[#F8FDFF]"id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#00B4D8] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#0077A8] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00B4D8]/10 to-[#0077A8]/10 border border-[#00B4D8]/20 px-5 py-2.5 rounded-full mb-6">
            <Heart className="w-5 h-5 text-[#00B4D8]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#0A0A0A]">Nos Projets</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-[#0A0A0A]">Impact</span>
            <span className="block bg-gradient-to-r from-[#00B4D8] via-[#0077A8] to-[#023E8A] text-transparent bg-clip-text">Réel</span>
          </h2>
          <p className="text-xl text-[#4A5568] max-w-4xl mx-auto leading-relaxed font-medium">
            Découvrez nos réalisations qui allient innovation technologique
            <span className="block mt-2 text-[#718096]">et impact social positif dans les communautés.</span>
          </p>
        </div>

        {/* Loading State */}
        {state.isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#4A5568] font-medium">Chargement des projets...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white border-2 border-[#EF4444]/30 rounded-2xl p-8 max-w-md text-center shadow-lg">
              <p className="text-[#EF4444] font-bold text-lg mb-4">Erreur de chargement</p>
              <p className="text-[#4A5568]">{state.error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-md"
              >
                Réessayer
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!state.isLoading && !state.error && state.projects.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-[#4A5568] font-medium text-lg">Aucun projet disponible pour le moment.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!state.isLoading && !state.error && state.projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {state.projects.map((project: Project, index: number) => (
              <div
                key={project.id ?? index}
                className="group bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#00B4D8]/30 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-[#00B4D8]/10 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 bg-gradient-to-br from-[#F0F9FF] to-[#F8FDFF] overflow-hidden">
                  {project.coverImageUrl ? (
                    <img
                      src={project.coverImageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#00B4D8_2px,_transparent_2px)] bg-[size:30px_30px] opacity-10 animate-pulse" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-[#00B4D8]/10 to-[#0077A8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Community Badge */}
                  {project.isCommunityProject && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#00B4D8] to-[#0077A8] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg hover:scale-110 transition-transform">
                      <Heart className="w-4 h-4" />
                      Impact Social
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#0A0A0A] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg border border-[#E2E8F0]">
                    {getCategoryIcon(project.projectType)}
                    {getCategoryLabel(project.projectType)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#00B4D8] group-hover:to-[#0077A8] group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-[#4A5568] text-sm mb-4 line-clamp-2 font-medium">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.techStack ?? []).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-[#F0F9FF] text-[#0077A8] px-3 py-1 rounded-lg text-xs font-medium border border-[#00B4D8]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-[#00B4D8] to-[#0077A8] hover:from-[#0077A8] hover:to-[#023E8A] text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:scale-105 shadow-lg shadow-[#00B4D8]/20"
                      >
                        Voir le projet
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 border border-[#00B4D8] hover:border-[#0077A8] text-[#00B4D8] rounded-xl transition-all duration-300 flex items-center justify-center hover:scale-105 hover:bg-[#F0F9FF]"
                      >
                        Code
                      </a>
                    )}
                    {!project.liveUrl && !project.repoUrl && (
                      <button className="flex-1 bg-gradient-to-r from-[#00B4D8] to-[#0077A8] hover:from-[#0077A8] hover:to-[#023E8A] text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#00B4D8]/20">
                        Voir le projet
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!state.isLoading && !state.error && state.projects.length > 0 && (
          <div className="mt-20 text-center relative z-10">
            <div className="inline-flex items-center gap-6 bg-white rounded-2xl px-8 py-4 border-2 border-[#E2E8F0] hover:border-[#00B4D8]/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-[#00B4D8]/10">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00B4D8] to-[#0077A8] rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-[#0A0A0A] font-semibold text-lg">Vous avez un projet à impact social ?</span>
              <button className="bg-gradient-to-r from-[#00B4D8] to-[#0077A8] hover:from-[#0077A8] hover:to-[#023E8A] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#00B4D8]/20">
                Démarrons ensemble
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

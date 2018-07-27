module.exports = function(grunt) {

    var configBridge = grunt.file.readJSON('./configBridge.json', { encoding: 'utf8' });
    var configAddon = grunt.file.readJSON('./course_addon.json', { encoding: 'utf8' });

    // Project configuration.
    grunt.initConfig({

        // plazartadmin: configBridge.config.plazart_admin.join('\n'),
        // plazartbase: configBridge.config.plazart_base.join('\n'),
        // plazartincludes: configBridge.config.plazart_includes.join('\n'),
        // tplcss: configBridge.config.tpl_css.join('\n'),
        // tplless: configBridge.config.tpl_less.join('\n'),
        // tpl_bootstrap: configBridge.config.tpl_bootstrap.join('\n'),
        tpCoreAdmin: configBridge.config.tp_core_admin.join('\n'),
        tpTplElegantLess: configBridge.config.tp_tpl_elegant_less.join('\n'),
        tpTplElegantCss: configBridge.config.tp_tpl_elegant_css.join('\n'),
        tpCoreAdminSourceJS: configBridge.config.tp_s_core_admin_js.join('\n'),
        tpCoreAdminJS: configBridge.config.tp_core_admin_js.join('\n'),
        tpCoreAdminSourceCss: configBridge.config.tp_s_core_admin_css.join('\n'),
        tpCoreAdminCss: configBridge.config.tp_core_admin_css.join('\n'),
        tpCoreLess: configBridge.config.tp_core_less.join('\n'),
        tpCoreCss: configBridge.config.tp_core_css.join('\n'),
        tpCoreSourceCss: configBridge.config.tp_core_source_css.join('\n'),
        tpCoreSourceJS: configBridge.config.tp_core_source_js.join('\n'),
        tpCoreJS: configBridge.config.tp_core_js.join('\n'),
        tpAddonMusicLess: configBridge.config.tp_addon_music_less.join('\n'),
        tpAddonMusicCss: configBridge.config.tp_addon_music_css.join('\n'),
        tpAddonCourseLess: configAddon.config.tp_addon_less.join('\n'),
        tpAddonCourseCss: configAddon.config.tp_addon_css.join('\n'),
        tpAddonContentVoteS: configBridge.config.tp_addon_source.join('\n')+"/content/vote",
        tpAddonContentVote: configBridge.config.tp_addon.join('\n')+"/content/vote",


        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            // plazart_admin: [
            //     '<%= plazartadmin %>/js/layout.admin.js',
            //     '<%= plazartbase %>/js/*.js',
            //     '!<%= plazartbase %>/js/*.min.js'
            // ]
            tpCore: ['<%= tpCoreSourceJS %>/tz_portfolio_plus.js']
        },

        uglify: {
            bootstrap: {
                options: {
                    sourceMap: true,
                    sourceMapName: '<%= yourjsfiles %>/script.js.map'
                },
                files: {
                    '<%= yourjsfiles %>/script.min.js': ['<%= yourjsfiles %>/alert.js','<%= yourjsfiles %>/button.js']
                }
            },
            tpAdminCoreLibraries: {
                options: {
                    sourceMap: false,
                    // ,sourceMapName: '<%= tpCoreJS %>/tz_portfolio_plus.js.map'
                },
                files: {
                    '<%= tpCoreAdminJS %>/jquery.fileupload.js': ['<%= tpCoreAdminSourceJS %>/libraries/jqueryFileUpload/jquery.fileupload.js'],
                    '<%= tpCoreAdminJS %>/vendor/jquery.ui.widget.js': ['<%= tpCoreAdminSourceJS %>/libraries/jqueryFileUpload/vendor/jquery.ui.widget.js']
                }
            },
            tpAdminCore: {
                options: {
                    sourceMap: false,
                    sourceMapName: '<%= tpCoreAdminJS %>/script.js.map'
                },
                files: {
                    '<%= tpCoreAdminJS %>/script.min.js': ['<%= tpCoreAdminSourceJS %>/script.js'],
                    '<%= tpCoreAdminJS %>/joomla4.min.js': ['<%= tpCoreAdminSourceJS %>/joomla4.js'],
                    '<%= tpCoreAdminJS %>/spectrum.min.js': ['<%= tpCoreAdminSourceJS %>/spectrum.js']
                }
            },
            tpLayoutAdmin: {
                options: {
                    sourceMap: false,
                    sourceMapName: '<%= tpCoreAdminJS %>/layout-admin.js.map'
                },
                files: {
                    '<%= tpCoreAdminJS %>/layout-admin.min.js': ['<%= tpCoreAdminSourceJS %>/layout-admin.js']
                }
            },
            tpLayoutAdminJ4: {
                options: {
                    sourceMap: false,
                    sourceMapName: '<%= tpCoreAdminJS %>/layout-admin.js.map'
                },
                files: {
                    '<%= tpCoreAdminJS %>/layout-admin.min.js': ['<%= tpCoreAdminSourceJS %>/layout-admin-j4.js']
                }
            },
            tpCore: {
                options: {
                    sourceMap: false,
                    sourceMapName: '<%= tpCoreJS %>/tz_portfolio_plus.js.map'
                },
                files: {
                    '<%= tpCoreJS %>/tz_portfolio_plus.min.js': ['<%= tpCoreSourceJS %>/tz_portfolio_plus.js']
                }
            },
            tpCoreJ4: {
                options: {
                    sourceMap: false,
                    sourceMapName: '<%= tpCoreJS %>/tz_portfolio_plus.js.map'
                },
                files: {
                    '<%= tpCoreJS %>/tz_portfolio_plus.min.js': ['<%= tpCoreSourceJS %>/tz_portfolio_plus-j4.js'],
                    '<%= tpCoreJS %>/core.min.js': ['<%= tpCoreSourceJS %>/core.js']
                }
            },
            tpCoreLibraries: {
                options: {
                    sourceMap: false,
                    // ,sourceMapName: '<%= tpCoreJS %>/tz_portfolio_plus.js.map'
                },
                files: {
                    '<%= tpCoreJS %>/classie.min.js': ['<%= tpCoreSourceJS %>/libraries/classie.js'],
                    '<%= tpCoreJS %>/notificationfx.min.js': ['<%= tpCoreSourceJS %>/libraries/notificationfx.js']
                }
            },
            tpAddonContentVote:{
                options: {
                    sourceMap: false,
                    // ,sourceMapName: '<%= tpCoreJS %>/tz_portfolio_plus.js.map'
                },
                files: {
                    '<%= tpAddonContentVoteS %>/js/vote.min.js': ['<%= tpAddonContentVoteS %>/js/vote.js']
                }
            },
        },

        concat: {
            catscript: {
                src: [
                    '<%= yourjsfiles %>/*.js'
                ],
                dest: '<%= yourjsfiles %>/allscript.js'
            }
        },

        // watch: {
        //     less: {
        //         files: ['<%= tplless %>/themes/default/*.less'],
        //         tasks: ['less-compile']
        //     },
        //     importless: {
        //         files: ['<%= tplless %>/import/default/*.less'],
        //         tasks: ['less-compile']
        //     }
        // },

        less: {
            // kunena: {
            //     options: {
            //         sourceMap: false,
            //         outputSourceFiles: false,
            //         sourceMapURL: 'kunene.css.map',
            //         sourceMapFilename: '<%= tplcss %>/themes/default/kunena.css.map'
            //     },
            //     src: '<%= tplless %>/themes/default/kunena.less',
            //     dest: '<%= tplcss %>/themes/default/kunena.css'
            // },
            // template: {
            //     options: {
            //         sourceMap: true,
            //         outputSourceFiles: true,
            //         sourceMapURL: 'template.css.map',
            //         sourceMapFilename: '<%= tplcss %>/themes/default/template.css.map'
            //     },
            //     src: '<%= tplless %>/themes/default/template.less',
            //     dest: '<%= tplcss %>/themes/default/template.css'
            // },
            // loadingBar: {
            //     src: '<%= tplless %>/themes/default/loading.less',
            //     dest: '<%= tplcss %>/themes/default/loading.css'
            // },
            // megamenu: {
            //     options: {
            //         sourceMap: true,
            //         outputSourceFiles: true,
            //         sourceMapURL: 'megamenu.css.map',
            //         sourceMapFilename: '<%= tplcss %>/themes/default/megamenu.css.map'
            //     },
            //     src: '<%= tplless %>/themes/default/megamenu.less',
            //     dest: '<%= tplcss %>/themes/default/megamenu.css'
            // },
            // others: {
            //     files: {
            //         "<%= tplcss %>/themes/default/megamenu-responsive.css": "<%= tplless %>/themes/default/megamenu-responsive.less",
            //         "<%= tplcss %>/themes/default/offline.css": "<%= tplless %>/themes/default/offline.less",
            //         "<%= tplcss %>/themes/default/print.css": "<%= tplless %>/themes/default/print.less",
            //         "<%= tplcss %>/themes/default/mail.css": "<%= tplless %>/themes/default/mail.less",
            //         "<%= tplcss %>/themes/default/ie7.css": "<%= tplless %>/themes/default/ie7.less",
            //         "<%= tplcss %>/themes/default/ie8.css": "<%= tplless %>/themes/default/ie8.less",
            //         "<%= tplcss %>/themes/default/ie9.css": "<%= tplless %>/themes/default/ie9.less",
            //         "<%= tplcss %>/themes/default/override.css": "<%= tplless %>/themes/default/override.less",
            //         "<%= tplcss %>/themes/default/error.css": "<%= tplless %>/themes/default/error.less"
            //     }
            // },
            // bootstrap: {
            //     options: {
            //         sourceMap: true,
            //         outputSourceFiles: true,
            //         sourceMapURL: 'bootstrap.css.map',
            //         sourceMapFilename: '<%= tpl_bootstrap %>/css/bootstrap.css.map'
            //     },
            //     src: './less/bootstrap/bootstrap.less',
            //     dest: '<%= tpl_bootstrap %>/css/bootstrap.css'
            // },
            // bootstrap_rtl: {
            //     options: {
            //         sourceMap: true,
            //         outputSourceFiles: true,
            //         sourceMapURL: 'bootstrap-rtl.css.map',
            //         sourceMapFilename: '<%= tpl_bootstrap %>/css/bootstrap-rtl.css.map'
            //     },
            //     src: './less/bootstrap-rtl/bootstrap-rtl.less',
            //     dest: '<%= tpl_bootstrap %>/css/bootstrap-rtl.css'
            // },
            elegant_template:{
                options: {
                    sourceMap: true,
                    compress: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'template.css.map',
                    sourceMapFilename: '<%= tpTplElegantCss %>/template.css.map'
                },
                src: '<%= tpTplElegantLess %>/template.less',
                dest: '<%= tpTplElegantCss %>/template.css'
            },
            tpCore:{
                options: {
                    sourceMap: false,
                    compress: true,
                    outputSourceFiles: false,
                    sourceMapURL: 'template.css.map',
                    sourceMapFilename: '<%= tpCoreCss %>/tzportfolioplus.css.map'
                },
                src: '<%= tpCoreLess %>/tzportfolioplus.less',
                dest: '<%= tpCoreCss %>/tzportfolioplus.min.css'
            }
            ,
            music_icon:{
                options: {
                    sourceMap: false,
                    compress: true,
                    outputSourceFiles: false
                    // sourceMapURL: 'template.css.map',
                    // sourceMapFilename: '<%= tpcss %>/template.css.map'
                },
                src: '<%= tpAddonMusicLess %>/glyphicons.less',
                dest: '<%= tpAddonMusicCss %>/glyphicons.css'
            }
            ,
            course_addon:{
                options: {
                    sourceMap: false,
                    compress: false,
                    outputSourceFiles: false,
                    banner: configAddon.config.topBanner.join('\n')
                    // sourceMapURL: 'template.css.map',
                    // sourceMapFilename: '<%= tpcss %>/template.css.map'
                },
                src: '<%= tpAddonCourseLess %>/style.less',
                dest: '<%= tpAddonCourseCss %>/style.css'
            }
        },

        autoprefixer: {
            options: {
                browsers: configBridge.config.autoprefixerBrowsers
            },
            core: {
                options: {
                    map: true
                },
                src: '<%= yourcss %>/bootstrap.css'
            },
            theme: {
                options: {
                    map: true
                },
                src: '<%= yourcss %>/bootstrap-theme.css'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: false,
                advanced: false
            },
            tpCore_Style: {
                src: '<%= tpCoreAdminSourceCss %>/style.css',
                dest: '<%= tpCoreAdminCss %>/style.min.css'
            },
            tpCore_Style_J4: {
                src: '<%= tpCoreAdminSourceCss %>/style-j4.css',
                dest: '<%= tpCoreAdminCss %>/style.min.css'
            },
            tpCore_NotifycationLayout: {
                files: {
                    '<%= tpCoreCss %>/ns-default.min.css': ['<%= tpCoreSourceCss %>/ns-default.css'],
                    '<%= tpCoreCss %>/ns-style-attached.min.css': ['<%= tpCoreSourceCss %>/ns-style-attached.css'],
                    '<%= tpCoreCss %>/ns-style-bar.min.css': ['<%= tpCoreSourceCss %>/ns-style-bar.css'],
                    '<%= tpCoreCss %>/ns-style-growl.min.css': ['<%= tpCoreSourceCss %>/ns-style-growl.css'],
                    '<%= tpCoreCss %>/ns-style-other.min.css': ['<%= tpCoreSourceCss %>/ns-style-other.css']
                }
            },
            minifyLayout: {
                src: '<%= tpCoreAdminSourceCss %>/admin-layout.css',
                dest: '<%= tpCoreAdminCss %>/admin-layout.min.css'
            }
            // ,
            // minifyCore: {
            //     src: '<%= tpl_bootstrap %>/css/bootstrap.css',
            //     dest: '<%= tpl_bootstrap %>/css/bootstrap.min.css'
            // },
            // minifyRtl: {
            //     src: '<%= tpl_bootstrap %>/css/bootstrap-rtl.css',
            //     dest: '<%= tpl_bootstrap %>/css/bootstrap-rtl.min.css'
            // },
            // minifyRtlLegacy: {
            //     src: '<%= plazartbase %>/bootstrap/legacy/css/bootstrap-rtl.css',
            //     dest: '<%= plazartbase %>/bootstrap/legacy/css/bootstrap-rtl.min.css'
            // },
            // minifyAdmin: {
            //     src: '<%= plazart_admin %>/css/admin.css',
            //     dest: '<%= plazart_admin %>/css/admin.min.css'
            // },
            // minifySpectrum: {
            //     src: '<%= plazart_admin %>/css/spectrum.css',
            //     dest: '<%= plazart_admin %>/css/spectrum.min.css'
            // },
            // minifyBootstrap:{
            //     files: [{
            //         expand: true,
            //         cwd: '<%= tpl_bootstrap %>/css',
            //         src: ['*.css', '!*.min.css'],
            //         dest: '<%= tpl_bootstrap %>/css',
            //         ext: '.css'
            //     }]
            // },
            // minifyThemes:{
            //     files: [{
            //         expand: true,
            //         cwd: '<%= tplcss %>/themes/default',
            //         src: ['*.css', '!*.min.css'],
            //         dest: '<%= tplcss %>/themes/default',
            //         ext: '.css'
            //     }]
            // }

        },

        usebanner: {
            options: {
                position: 'top',
                banner: '<%= topBanner %>'
            },
            files: {
                src: '<%= yourcss %>/*.css'
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist: [
                '<%= yourcss %>/bootstrap.css',
                '<%= yourcss %>/bootstrap-theme.css'
            ]
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-banner');
    // grunt.loadNpmTasks('grunt-jsvalidate');

    // Load tasks.
    //require('matchdep').filterDev(['grunt-*', '!grunt-legacy-util']).forEach( grunt.loadNpmTasks );

    // grunt.registerTask('plazat-hint', ['jshint:plazart_admin']);
    // grunt.registerTask('less-compile', ['less:template', 'less:megamenu', 'less:others']);
    // grunt.registerTask('less-tp-compile', ['less:tz_portfolio_plus']);
    // grunt.registerTask('less-bootstrap', ['less:bootstrap', 'less:bootstrap_rtl','cssmin:minifyCore', 'cssmin:minifyRtl']);
    // grunt.registerTask('minify-bootstrap', ['cssmin:minifyCore', 'cssmin:minifyTheme']);
    // grunt.registerTask('minify-admin', ['cssmin:minifyAdmin', 'cssmin:minifyLayout', 'cssmin:minifySpectrum']);
    // grunt.registerTask('minify-all', ['cssmin:all']);
    // grunt.registerTask('minifyjs-bootstrap', ['uglify:bootstrap']);
    // grunt.registerTask('concat-js-bootstrap', ['concat:catscript']);
    // grunt.registerTask('watch-less', ['watch:less']);
    // grunt.registerTask('minify_rtl_legacy', ['cssmin:minifyRtlLegacy']);


    grunt.registerTask('tp-core-front-end-css', ['less:tpCore']);
    grunt.registerTask("tp-core-front-end-js", ["jshint:tpCore","uglify:tpCore"]);
    // grunt.registerTask("tp-core-back-end-css", ["jshint:tpCore","uglify:tpCore"]);
    // grunt.registerTask('tp-core-front-end-js', ['uglify:tpCore']);

};
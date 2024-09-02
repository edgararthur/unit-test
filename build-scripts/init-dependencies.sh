function get_root_dirpath() {
    cur_dirpath=$(pwd)
    filepath_package_json=$cur_dirpath/package.json

    if [ -e $filepath_package_json ]; then
        echo $cur_dirpath
        return
    fi

    cur_dirpath=$(realpath $(pwd)/..)
    filepath_package_json=$cur_dirpath/package.json

    if [ -e $filepath_package_json ]; then
        echo $cur_dirpath
        return
    fi

    echo "Error: Cannot detect app root directory. Please cd to the root directory, and run the script"
    exit 1
}

function main() {
    dir_app_root=$(get_root_dirpath)

    # Clone dependent modules
    mkdir -p $dir_app_root/src-deps

    # Use array, because associative array seems not support in many bash environment
    declare -a LIST_REPO_OUT_DIRNAME
    declare -a LIST_REPO_URL

    cur_repo_index=0
    LIST_REPO_OUT_DIRNAME[$cur_repo_index]="lib-cpn-rn-app-management"
    LIST_REPO_URL[$cur_repo_index]="git@gitpub.compathnion.com:linh.ta/lib-cpn-rn-app-management.git"

    cur_repo_index=1
    LIST_REPO_OUT_DIRNAME[$cur_repo_index]="appmodule-sight"
    LIST_REPO_URL[$cur_repo_index]="git@gitpub.compathnion.com:linh.ta/cpn-rn-4s-appmodule-sight.git"

    cur_repo_index=2
    LIST_REPO_OUT_DIRNAME[$cur_repo_index]="appmodule-epermit"
    LIST_REPO_URL[$cur_repo_index]="git@gitpub.compathnion.com:saifur.rahman/kaitak-e-permit-mobile-app.git"

    # NOTE: The below 2 dependencies should be removed after the map view becomes stable
    # BEGIN
    cur_repo_index=3
    LIST_REPO_OUT_DIRNAME[$cur_repo_index]="lib-cpn-mobile-web-mapview"
    LIST_REPO_URL[$cur_repo_index]="git@gitpub.compathnion.com:linh.ta/lib-cpn-mobile-web-mapview.git"

    cur_repo_index=4
    LIST_REPO_OUT_DIRNAME[$cur_repo_index]="lib-cpn-rn-mobile-web-mapview"
    LIST_REPO_URL[$cur_repo_index]="git@gitpub.compathnion.com:linh.ta/lib-cpn-rn-mobile-web-mapview.git"

    cur_repo_index=5
    LIST_REPO_OUT_DIRNAME[$cur_repo_index]="lib-cpn-rn-position-track"
    LIST_REPO_URL[$cur_repo_index]="git@gitpub.compathnion.com:saifur.rahman/lib-cpn-rn-position-track.git"
    # END

    for i in "${!LIST_REPO_OUT_DIRNAME[@]}"; do
        cd $dir_app_root/src-deps

        dirname=${LIST_REPO_OUT_DIRNAME[$i]}
        repo_url=${LIST_REPO_URL[$i]}

        git clone $repo_url $dirname
        cd $dirname
    done
}

# Main
main
